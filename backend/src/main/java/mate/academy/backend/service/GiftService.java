package mate.academy.backend.service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;
import mate.academy.backend.dao.GiftRepository;
import mate.academy.backend.dao.TagRepository;
import mate.academy.backend.dto.GiftDto;
import mate.academy.backend.dto.GiftUpsertRequest;
import mate.academy.backend.mapper.GiftMapper;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.Tag;
import mate.academy.backend.specification.GiftSpecifications;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GiftService {
    private final GiftRepository giftRepository;
    private final TagRepository tagRepository;
    private final GiftMapper giftMapper;

    public GiftService(GiftRepository giftRepository, TagRepository tagRepository, GiftMapper giftMapper) {
        this.giftRepository = giftRepository;
        this.tagRepository = tagRepository;
        this.giftMapper = giftMapper;
    }

    @Transactional(readOnly = true)
    public List<GiftDto> search(String q, Integer priceMinCents, Integer priceMaxCents, Integer age, Set<String> tags) {
        Specification<Gift> spec = (root, query, cb) -> cb.conjunction();

        if (q != null && !q.isBlank()) {
            spec = spec.and(GiftSpecifications.nameLike(q));
        }
        if (priceMinCents != null) {
            spec = spec.and(GiftSpecifications.priceGte(priceMinCents));
        }
        if (priceMaxCents != null) {
            spec = spec.and(GiftSpecifications.priceLte(priceMaxCents));
        }
        if (age != null) {
            spec = spec.and(GiftSpecifications.fitsAge(age));
        }
        Set<String> normalizedTags = normalizeTags(tags);
        if (!normalizedTags.isEmpty()) {
            spec = spec.and(GiftSpecifications.hasAnyTags(normalizedTags));
        }

        return giftRepository.findAll(spec).stream()
                .map(giftMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public GiftDto getById(Long id) {
        Gift g = giftRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Gift not found"));
        return giftMapper.toDto(g);
    }

    @Transactional
    public GiftDto create(GiftUpsertRequest req) {
        Gift g = giftMapper.toEntity(req);
        resolveTags(g, req.tags());
        giftRepository.save(g);
        return giftMapper.toDto(g);
    }

    @Transactional
    public GiftDto update(Long id, GiftUpsertRequest req) {
        Gift g = giftRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Gift not found"));
        giftMapper.updateEntity(req, g);
        resolveTags(g, req.tags());
        return giftMapper.toDto(g);
    }

    @Transactional
    public void delete(Long id) {
        giftRepository.deleteById(id);
    }

    private void resolveTags(Gift g, Set<String> tagNames) {
        Set<Tag> resolved = new LinkedHashSet<>();
        for (String tagName : normalizeTags(tagNames)) {
            Tag tag = tagRepository.findByName(tagName)
                    .orElseGet(() -> {
                        Tag t = new Tag();
                        t.setName(tagName);
                        return tagRepository.save(t);
                    });
            resolved.add(tag);
        }
        g.setTags(resolved);
    }

    private Set<String> normalizeTags(Set<String> tags) {
        if (tags == null) {
            return Set.of();
        }
        return tags.stream()
                .filter(s -> s != null && !s.isBlank())
                .map(s -> s.trim().toLowerCase(Locale.ROOT))
                .collect(java.util.stream.Collectors.toCollection(LinkedHashSet::new));
    }
}


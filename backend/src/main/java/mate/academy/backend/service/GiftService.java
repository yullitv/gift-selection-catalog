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

    public GiftService(GiftRepository giftRepository, TagRepository tagRepository) {
        this.giftRepository = giftRepository;
        this.tagRepository = tagRepository;
    }

    @Transactional(readOnly = true)
    public List<GiftDto> search(String q, Integer priceMinCents, Integer priceMaxCents, Set<String> tags) {
        Specification<Gift> spec = Specification.where(GiftSpecifications.nameLike(q))
                .and(GiftSpecifications.priceGte(priceMinCents))
                .and(GiftSpecifications.priceLte(priceMaxCents))
                .and(GiftSpecifications.hasAnyTags(normalizeTags(tags)));

        return giftRepository.findAll(spec).stream().map(GiftMapper::toDto).toList();
    }

    @Transactional(readOnly = true)
    public GiftDto getById(Long id) {
        Gift g = giftRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Gift not found"));
        return GiftMapper.toDto(g);
    }

    @Transactional
    public GiftDto create(GiftUpsertRequest req) {
        Gift g = new Gift();
        apply(g, req);
        giftRepository.save(g);
        return GiftMapper.toDto(g);
    }

    @Transactional
    public GiftDto update(Long id, GiftUpsertRequest req) {
        Gift g = giftRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Gift not found"));
        apply(g, req);
        return GiftMapper.toDto(g);
    }

    @Transactional
    public void delete(Long id) {
        giftRepository.deleteById(id);
    }

    private void apply(Gift g, GiftUpsertRequest req) {
        g.setName(req.name());
        g.setDescription(req.description());
        g.setPriceCents(req.priceCents());
        g.setPhotoUrl(req.photoUrl());
        g.setStockQuantity(req.stockQuantity());

        Set<Tag> newTags = new LinkedHashSet<>();
        for (String tagName : normalizeTags(req.tags())) {
            Tag tag = tagRepository.findByName(tagName)
                    .orElseGet(() -> {
                        Tag t = new Tag();
                        t.setName(tagName);
                        return tagRepository.save(t);
                    });
            newTags.add(tag);
        }
        g.setTags(newTags);
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


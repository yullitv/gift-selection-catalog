package mate.academy.backend.service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import mate.academy.backend.dao.GiftRepository;
import mate.academy.backend.dao.TagRepository;
import mate.academy.backend.dto.GiftDto;
import mate.academy.backend.dto.GiftUpsertRequest;
import mate.academy.backend.mapper.GiftMapper;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.GiftAudience;
import mate.academy.backend.model.GiftSort;
import mate.academy.backend.model.Tag;
import mate.academy.backend.specification.GiftSpecifications;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Page<GiftDto> search(
            String q,
            Integer priceMinCents,
            Integer priceMaxCents,
            Integer age,
            Set<GiftAudience> targetAudience,
            Set<String> tags,
            Boolean inStock,
            GiftSort sort,
            int page,
            int size
    ) {
        Specification<Gift> spec = (root, query, cb) -> cb.conjunction();

        if (q != null && !q.isBlank()) {
            spec = spec.and(GiftSpecifications.textSearch(q));
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

        if (targetAudience != null && !targetAudience.isEmpty()) {
            spec = spec.and(GiftSpecifications.hasAnyTargetAudience(targetAudience));
        }

        Set<String> normalizedTags = normalizeTags(tags);
        if (!normalizedTags.isEmpty()) {
            spec = spec.and(GiftSpecifications.hasAnyTags(normalizedTags));
        }

        if (Boolean.TRUE.equals(inStock)) {
            spec = spec.and(GiftSpecifications.inStock());
        }

        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                Math.min(Math.max(size, 1), 24),
                resolveSort(sort)
        );

        return giftRepository.findAll(spec, pageable)
                .map(giftMapper::toDto);
    }

    private Sort resolveSort(GiftSort sort) {
        return switch (sort) {
            case PRICE_ASC -> Sort.by(Sort.Direction.ASC, "priceCents");

            case PRICE_DESC -> Sort.by(Sort.Direction.DESC, "priceCents");

            case NEWEST -> Sort.by(Sort.Direction.DESC, "id");
        };
    }

    @Transactional(readOnly = true)
    public GiftDto getById(Long id) {
        Gift g = giftRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Gift not found"));
        return giftMapper.toDto(g);
    }

    @Transactional
    public GiftDto create(GiftUpsertRequest req) {
        Gift g = giftMapper.toEntity(req);
        g.setTargetAudiences(new LinkedHashSet<>(req.targetAudiences()));
        resolveTags(g, req.tags());
        giftRepository.save(g);
        return giftMapper.toDto(g);
    }

    @Transactional
    public GiftDto update(Long id, GiftUpsertRequest req) {
        Gift g = giftRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Gift not found"));
        giftMapper.updateEntity(req, g);
        g.setTargetAudiences(new LinkedHashSet<>(req.targetAudiences()));
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


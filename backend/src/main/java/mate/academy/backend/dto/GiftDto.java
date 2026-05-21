package mate.academy.backend.dto;

import java.util.List;
import java.util.Set;
import mate.academy.backend.model.GiftAudience;

public record GiftDto(
        Long id,
        String name,
        String description,
        int priceCents,
        String photoUrl,
        String primaryImageUrl,
        List<String> imageUrls,
        int stockQuantity,
        Integer minAge,
        Integer maxAge,
        Set<GiftAudience> targetAudiences,
        Set<String> tags
) {
}


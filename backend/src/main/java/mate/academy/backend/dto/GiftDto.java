package mate.academy.backend.dto;

import java.util.Set;

public record GiftDto(
        Long id,
        String name,
        String description,
        int priceCents,
        String photoUrl,
        int stockQuantity,
        Set<String> tags
) {
}


package mate.academy.backend.dto;

import java.time.Instant;

public record WishlistItemDto(
        Long id,
        Long giftId,
        String name,
        int priceCents,
        String imageUrl,
        Instant createdAt
) {
}

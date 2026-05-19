package mate.academy.backend.dto;

public record CartItemDto(
        Long giftId,
        String name,
        String photoUrl,
        int priceCents,
        int quantity,
        int subtotalCents
) {
}

package mate.academy.backend.dto;

public record OrderItemDto(
        Long giftId,
        String giftName,
        String photoUrl,
        int quantity,
        int priceCents,
        int subtotalCents
) {
}

package mate.academy.backend.dto;

public record GiftImageDto(
        String imageUrl,
        int sortOrder,
        boolean primary
) {
}

package mate.academy.backend.dto;

import java.util.List;

public record CartDto(
        List<CartItemDto> items,
        int totalItems,
        int totalPriceCents
) {
}

package mate.academy.backend.dto;

import java.util.List;

public class CartDto {
    List<CartItemDto> items;
    Integer totalItems;
    Integer totalPriceCents;
}

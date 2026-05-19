package mate.academy.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record AddCartItemRequest(
        @NotNull Long giftId,
        @NotNull @Positive Integer quantity
) {
}

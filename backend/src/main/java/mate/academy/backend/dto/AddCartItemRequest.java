package mate.academy.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class AddCartItemRequest {
    Long giftId;
    @NotNull
    @Positive
    Integer quantity;
}

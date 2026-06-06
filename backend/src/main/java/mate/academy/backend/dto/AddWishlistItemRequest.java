package mate.academy.backend.dto;

import jakarta.validation.constraints.NotNull;

public record AddWishlistItemRequest(@NotNull Long giftId) {
}

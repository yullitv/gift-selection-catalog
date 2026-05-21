package mate.academy.backend.dto;

import jakarta.validation.constraints.NotNull;
import mate.academy.backend.model.OrderStatus;

public record UpdateOrderStatusRequest(
        @NotNull OrderStatus status
) {
}

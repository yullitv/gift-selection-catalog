package mate.academy.backend.dto;

import java.time.Instant;
import java.util.List;
import mate.academy.backend.model.OrderStatus;

public record OrderDetailsDto(
        Long id,
        Instant createdAt,
        int totalCents,
        OrderStatus status,
        String statusLabel,
        List<OrderItemDto> items
) {
}

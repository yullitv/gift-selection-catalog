package mate.academy.backend.dto;

import java.time.Instant;
import mate.academy.backend.model.OrderStatus;

public record OrderSummaryDto(
        Long id,
        Instant createdAt,
        int totalCents,
        OrderStatus status,
        String statusLabel
) {
}

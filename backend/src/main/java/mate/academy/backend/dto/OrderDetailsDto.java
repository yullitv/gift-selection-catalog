package mate.academy.backend.dto;

import java.time.Instant;
import java.util.List;
import mate.academy.backend.model.DeliveryType;
import mate.academy.backend.model.OrderStatus;
import mate.academy.backend.model.PaymentMethod;
import mate.academy.backend.model.PaymentStatus;

public record OrderDetailsDto(
        Long id,
        Instant createdAt,
        Instant estimatedDeliveryAt,
        int totalCents,
        OrderStatus status,
        String statusLabel,
        String recipientFullName,
        String recipientPhone,
        String recipientEmail,
        DeliveryType deliveryType,
        String npCityName,
        String npWarehouseName,
        String courierAddress,
        PaymentMethod paymentMethod,
        PaymentStatus paymentStatus,
        List<OrderItemDto> items
) {
}

package mate.academy.backend.mapper;

import java.time.temporal.ChronoUnit;
import java.util.List;
import mate.academy.backend.dto.OrderDetailsDto;
import mate.academy.backend.dto.OrderItemDto;
import mate.academy.backend.dto.OrderSummaryDto;
import mate.academy.backend.model.DeliveryType;
import mate.academy.backend.model.Order;
import mate.academy.backend.model.OrderItem;
import mate.academy.backend.util.OrderStatusLabels;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    // Estimated delivery window in days per delivery type
    private static final int DELIVERY_DAYS_NOVA_POSHTA = 3;
    private static final int DELIVERY_DAYS_COURIER = 1;

    public OrderSummaryDto toSummaryDto(Order order) {
        return new OrderSummaryDto(
                order.getId(),
                order.getCreatedAt(),
                order.getTotalCents(),
                order.getStatus(),
                OrderStatusLabels.label(order.getStatus())
        );
    }

    public OrderDetailsDto toDetailsDto(Order order) {
        return new OrderDetailsDto(
                order.getId(),
                order.getCreatedAt(),
                estimatedDeliveryAt(order),
                order.getTotalCents(),
                order.getStatus(),
                OrderStatusLabels.label(order.getStatus()),
                order.getRecipientFullName(),
                order.getRecipientPhone(),
                order.getRecipientEmail(),
                order.getDeliveryType(),
                order.getNpCityName(),
                order.getNpWarehouseName(),
                order.getCourierAddress(),
                order.getPaymentMethod(),
                order.getPaymentStatus(),
                order.getItems().stream().map(this::toItemDto).toList()
        );
    }

    public List<OrderSummaryDto> toSummaryDtos(List<Order> orders) {
        return orders.stream().map(this::toSummaryDto).toList();
    }

    private OrderItemDto toItemDto(OrderItem item) {
        return new OrderItemDto(
                item.getGift().getId(),
                item.getGiftName(),
                item.getPhotoUrl(),
                item.getQuantity(),
                item.getPriceCents(),
                item.getPriceCents() * item.getQuantity()
        );
    }

    private java.time.Instant estimatedDeliveryAt(Order order) {
        if (order.getCreatedAt() == null) {
            return null;
        }
        int days = order.getDeliveryType() == DeliveryType.COURIER
                ? DELIVERY_DAYS_COURIER
                : DELIVERY_DAYS_NOVA_POSHTA;
        return order.getCreatedAt().plus(days, ChronoUnit.DAYS);
    }
}

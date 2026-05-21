package mate.academy.backend.mapper;

import java.util.List;
import mate.academy.backend.dto.OrderDetailsDto;
import mate.academy.backend.dto.OrderItemDto;
import mate.academy.backend.dto.OrderSummaryDto;
import mate.academy.backend.model.Order;
import mate.academy.backend.model.OrderItem;
import mate.academy.backend.util.OrderStatusLabels;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

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
                order.getTotalCents(),
                order.getStatus(),
                OrderStatusLabels.label(order.getStatus()),
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
}

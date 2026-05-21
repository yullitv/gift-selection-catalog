package mate.academy.backend.util;

import mate.academy.backend.model.OrderStatus;

public final class OrderStatusLabels {
    private OrderStatusLabels() {
    }

    public static String label(OrderStatus status) {
        return switch (status) {
            case PENDING_PAYMENT -> "Очікує оплати";
            case IN_TRANSIT -> "В дорозі";
            case COMPLETED -> "Виконано";
            case CANCELLED -> "Скасовано";
        };
    }
}

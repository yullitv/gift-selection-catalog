package mate.academy.backend.util;

import mate.academy.backend.model.OrderStatus;

public final class OrderStatusLabels {
    private OrderStatusLabels() {
    }

    public static String label(OrderStatus status) {
        return switch (status) {
            case PENDING_PAYMENT -> "Pending payment";
            case IN_TRANSIT -> "In transit";
            case COMPLETED -> "Completed";
            case CANCELLED -> "Cancelled";
        };
    }
}

package mate.academy.backend.service;

import mate.academy.backend.model.Order;

public interface EmailService {
    void sendOrderConfirmation(Order order);
}

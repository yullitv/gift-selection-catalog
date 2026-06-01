package mate.academy.backend.service;

import mate.academy.backend.model.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class StubEmailService implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(StubEmailService.class);

    @Override
    public void sendOrderConfirmation(Order order) {
        log.info(
                "[EMAIL STUB] Order confirmation → to: {} | order: #{} | total: {} UAH | status: {}",
                order.getRecipientEmail(),
                order.getId(),
                order.getTotalCents() / 100.0,
                order.getStatus()
        );
    }
}

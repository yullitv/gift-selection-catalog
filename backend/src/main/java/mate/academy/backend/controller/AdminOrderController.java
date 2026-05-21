package mate.academy.backend.controller;

import jakarta.validation.Valid;
import mate.academy.backend.dto.OrderSummaryDto;
import mate.academy.backend.dto.UpdateOrderStatusRequest;
import mate.academy.backend.service.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
public class AdminOrderController {
    private final OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PatchMapping("/{id}/status")
    public OrderSummaryDto updateStatus(@PathVariable Long id,
                                        @Valid @RequestBody UpdateOrderStatusRequest request) {
        return orderService.updateStatus(id, request);
    }
}

package mate.academy.backend.controller;

import jakarta.validation.Valid;
import java.util.List;
import mate.academy.backend.dto.CreateOrderRequest;
import mate.academy.backend.dto.OrderDetailsDto;
import mate.academy.backend.dto.OrderSummaryDto;
import mate.academy.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderSummaryDto> listOrders(@AuthenticationPrincipal Jwt jwt) {
        return orderService.listOrders(currentUserId(jwt));
    }

    @GetMapping("/{id}")
    public OrderDetailsDto getOrder(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        return orderService.getOrder(currentUserId(jwt), id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDetailsDto checkout(@AuthenticationPrincipal Jwt jwt,
                                    @Valid @RequestBody CreateOrderRequest request) {
        return orderService.checkout(currentUserId(jwt), request);
    }

    private Long currentUserId(Jwt jwt) {
        return Long.valueOf(jwt.getSubject());
    }
}

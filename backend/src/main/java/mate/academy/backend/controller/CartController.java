package mate.academy.backend.controller;

import jakarta.validation.Valid;
import mate.academy.backend.dto.AddCartItemRequest;
import mate.academy.backend.dto.CartDto;
import mate.academy.backend.dto.UpdateCartItemQuantityRequest;
import mate.academy.backend.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public CartDto getCart(@AuthenticationPrincipal Jwt jwt) {
        return cartService.getCart(currentUserId(jwt));
    }

    @PostMapping("/items")
    public CartDto addItem(@AuthenticationPrincipal Jwt jwt,
                           @Valid @RequestBody AddCartItemRequest request) {
        return cartService.addItem(currentUserId(jwt), request);
    }

    @PutMapping("/items/{giftId}")
    public CartDto updateItem(@AuthenticationPrincipal Jwt jwt,
                              @PathVariable Long giftId,
                              @Valid @RequestBody UpdateCartItemQuantityRequest request) {
        return cartService.updateItemQuantity(currentUserId(jwt), giftId, request);
    }

    @DeleteMapping("/items/{giftId}")
    public CartDto removeItem(@AuthenticationPrincipal Jwt jwt, @PathVariable Long giftId) {
        return cartService.removeItem(currentUserId(jwt), giftId);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart(@AuthenticationPrincipal Jwt jwt) {
        cartService.clearCart(currentUserId(jwt));
    }

    private Long currentUserId(Jwt jwt) {
        return Long.valueOf(jwt.getSubject());
    }
}

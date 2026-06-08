package mate.academy.backend.controller;

import jakarta.validation.Valid;
import java.util.List;
import mate.academy.backend.dto.AddWishlistItemRequest;
import mate.academy.backend.dto.WishlistItemDto;
import mate.academy.backend.service.WishlistService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public List<WishlistItemDto> getWishlist(@AuthenticationPrincipal Jwt jwt) {
        return wishlistService.getWishlist(currentUserId(jwt));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<WishlistItemDto> addItem(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody AddWishlistItemRequest request
    ) {
        return wishlistService.addItem(currentUserId(jwt), request);
    }

    @DeleteMapping("/{id}")
    public List<WishlistItemDto> removeItem(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long id
    ) {
        return wishlistService.removeItem(currentUserId(jwt), id);
    }

    @GetMapping("/public/{shareToken}")
    public List<WishlistItemDto> getPublicWishlist(@PathVariable String shareToken) {
        return wishlistService.getPublicWishlist(shareToken);
    }

    private Long currentUserId(Jwt jwt) {
        return Long.valueOf(jwt.getSubject());
    }
}

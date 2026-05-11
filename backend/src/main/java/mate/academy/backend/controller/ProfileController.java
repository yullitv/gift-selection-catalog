package mate.academy.backend.controller;

import jakarta.validation.Valid;
import mate.academy.backend.dto.UpdateProfileRequest;
import mate.academy.backend.dto.UserDto;
import mate.academy.backend.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserDto getProfile(@AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.valueOf(jwt.getSubject());
        return userService.getProfile(userId);
    }

    @PutMapping
    public UserDto updateProfile(@AuthenticationPrincipal Jwt jwt,
                                 @Valid @RequestBody UpdateProfileRequest req) {
        Long userId = Long.valueOf(jwt.getSubject());
        return userService.updateProfile(userId, req);
    }
}

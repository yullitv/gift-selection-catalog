package mate.academy.backend.auth;

import jakarta.validation.Valid;
import mate.academy.backend.auth.dto.AuthLoginRequest;
import mate.academy.backend.auth.dto.AuthRegisterRequest;
import mate.academy.backend.auth.dto.AuthResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody AuthRegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthLoginRequest req) {
        return authService.login(req);
    }
}


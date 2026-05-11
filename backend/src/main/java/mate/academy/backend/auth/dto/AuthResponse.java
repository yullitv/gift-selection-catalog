package mate.academy.backend.auth.dto;

import mate.academy.backend.security.CurrentUser;

public record AuthResponse(
        String accessToken,
        CurrentUser user
) {
}


package mate.academy.backend.dto.Authdto;

import mate.academy.backend.security.CurrentUser;

public record AuthResponse(
        String accessToken,
        CurrentUser user
) {
}


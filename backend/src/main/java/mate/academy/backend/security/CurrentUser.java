package mate.academy.backend.security;

import java.util.UUID;
import mate.academy.backend.model.User;

public record CurrentUser(
        Long id,
        String email,
        String fullName
) {
    public static CurrentUser from(User user) {
        return new CurrentUser(user.getId(), user.getEmail(), user.getFullName());
    }
}


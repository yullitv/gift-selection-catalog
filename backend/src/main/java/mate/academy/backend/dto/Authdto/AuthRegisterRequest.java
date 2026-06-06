package mate.academy.backend.dto.Authdto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AuthRegisterRequest(
        @NotBlank(message = "First name is required")
        @Size(min = 2, message = "First name must be at least 2 characters")
        @Pattern(
                regexp = "^[a-zA-Zа-яА-ЯіІїЇєЄґҐʼ'\\-]+$",
                message = "First name can only contain letters, hyphens and apostrophes"
        )
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(min = 2, message = "Last name must be at least 2 characters")
        @Pattern(
                regexp = "^[a-zA-Zа-яА-ЯіІїЇєЄґҐʼ'\\-]+$",
                message = "Last name can only contain letters, hyphens and apostrophes"
        )
        String lastName,

        @NotBlank(message = "Email is required")
        @Email(message = "Please enter a valid email address")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, max = 72, message = "Password must be between 8 and 72 characters")
        String password
) {
}

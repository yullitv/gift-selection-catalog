package mate.academy.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
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

        @Pattern(
                regexp = "^$|^\\+?[0-9]{10,15}$",
                message = "Phone must contain 10-15 digits, optionally starting with +"
        )
        String phone
) {
}

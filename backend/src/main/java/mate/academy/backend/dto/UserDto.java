package mate.academy.backend.dto;

public record UserDto(
        Long id,
        String fullName,
        String email
) {
}

package mate.academy.backend.dto;

public record UserDto(
        Long id,
        String firstName,
        String lastName,
        String fullName,
        String email,
        String phone
) {
}

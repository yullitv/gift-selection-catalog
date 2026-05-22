package mate.academy.backend.common.error;

import org.springframework.http.HttpStatus;

public class ConflictException extends ApiException {
    public ConflictException(ErrorCode code, String message) {
        super(code, HttpStatus.CONFLICT, message);
    }

    public static ConflictException emailAlreadyRegistered() {
        return new ConflictException(
                ErrorCode.EMAIL_ALREADY_REGISTERED,
                "A user with this email is already registered"
        );
    }
}

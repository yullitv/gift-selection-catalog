package mate.academy.backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import mate.academy.backend.common.error.ApiErrorWriter;
import mate.academy.backend.common.error.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final ApiErrorWriter apiErrorWriter;

    public RestAuthenticationEntryPoint(ApiErrorWriter apiErrorWriter) {
        this.apiErrorWriter = apiErrorWriter;
    }

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException {
        apiErrorWriter.write(
                request,
                response,
                HttpStatus.UNAUTHORIZED,
                ErrorCode.UNAUTHORIZED,
                "Please sign in to your account"
        );
    }
}

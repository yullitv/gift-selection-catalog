package mate.academy.backend.security;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.security.jwt")
public record AppSecurityProperties(
        String secret,
        String issuer,
        Duration accessTokenTtl
) {
}


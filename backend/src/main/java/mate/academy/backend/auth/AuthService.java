package mate.academy.backend.auth;

import java.time.Instant;
import java.util.HexFormat;
import java.security.SecureRandom;
import mate.academy.backend.common.error.ConflictException;
import mate.academy.backend.common.error.NotFoundException;
import mate.academy.backend.dto.Authdto.AuthLoginRequest;
import mate.academy.backend.dto.Authdto.AuthRegisterRequest;
import mate.academy.backend.dto.Authdto.AuthResponse;
import mate.academy.backend.dao.UserRepository;
import mate.academy.backend.security.AppSecurityProperties;
import mate.academy.backend.security.CurrentUser;
import mate.academy.backend.security.UserPrincipal;
import mate.academy.backend.model.Role;
import mate.academy.backend.model.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtEncoder jwtEncoder;
    private final AppSecurityProperties props;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtEncoder jwtEncoder,
            AppSecurityProperties props
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtEncoder = jwtEncoder;
        this.props = props;
    }

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    @Transactional
    public AuthResponse register(AuthRegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw ConflictException.emailAlreadyRegistered();
        }
        User u = new User();
        u.setFullName(req.firstName().trim() + " " + req.lastName().trim());
        u.setEmail(req.email().toLowerCase());
        u.setPasswordHash(passwordEncoder.encode(req.password()));
        u.setRole(Role.USER);
        u.setShareToken(generateUniqueShareToken());
        u.setCreatedAt(Instant.now());
        userRepository.save(u);

        String token = issueToken(u);
        return new AuthResponse(token, CurrentUser.from(u));
    }

    public AuthResponse login(AuthLoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email().toLowerCase(), req.password())
        );
        UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
        User u = userRepository.findById(principal.getId())
                .orElseThrow(NotFoundException::user);
        String token = issueToken(u);
        return new AuthResponse(token, CurrentUser.from(u));
    }

    private String generateUniqueShareToken() {
        String token;
        do {
            byte[] bytes = new byte[32];
            SECURE_RANDOM.nextBytes(bytes);
            token = HexFormat.of().formatHex(bytes);
        } while (userRepository.existsByShareToken(token));
        return token;
    }

    private String issueToken(User u) {
        Instant now = Instant.now();
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(props.issuer())
                .issuedAt(now)
                .expiresAt(now.plus(props.accessTokenTtl()))
                .subject(String.valueOf(u.getId()))
                .claim("email", u.getEmail())
                .claim("role", u.getRole().name())
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}


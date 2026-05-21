package mate.academy.backend.service;

import mate.academy.backend.dao.UserRepository;
import mate.academy.backend.dto.UpdateProfileRequest;
import mate.academy.backend.dto.UserDto;
import mate.academy.backend.model.User;
import mate.academy.backend.util.FullNameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserDto getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return toDto(user);
    }

    @Transactional
    public UserDto updateProfile(Long userId, UpdateProfileRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setFullName(FullNameUtils.join(req.firstName(), req.lastName()));
        if (req.phone() != null) {
            String phone = req.phone().trim();
            user.setPhone(phone.isEmpty() ? null : phone);
        }
        return toDto(user);
    }

    private UserDto toDto(User user) {
        String[] parts = FullNameUtils.split(user.getFullName());
        return new UserDto(
                user.getId(),
                parts[0],
                parts[1],
                user.getFullName(),
                user.getEmail(),
                user.getPhone()
        );
    }
}

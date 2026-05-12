package mate.academy.backend.service;

import mate.academy.backend.dao.UserRepository;
import mate.academy.backend.dto.UpdateProfileRequest;
import mate.academy.backend.dto.UserDto;
import mate.academy.backend.mapper.UserMapper;
import mate.academy.backend.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Transactional(readOnly = true)
    public UserDto getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return userMapper.toDto(user);
    }

    @Transactional
    public UserDto updateProfile(Long userId, UpdateProfileRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setFullName(req.firstName().trim() + " " + req.lastName().trim());
        return userMapper.toDto(user);
    }
}

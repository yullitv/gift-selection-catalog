package mate.academy.backend.mapper;

import mate.academy.backend.dto.UserDto;
import mate.academy.backend.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User user);
}

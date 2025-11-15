package io.todolist.mapper;

import io.todolist.dto.UserDto;
import io.todolist.model.User;
import io.todolist.model.UserStatus;
import org.springframework.stereotype.Component;

@Component
public class UserMapperImpl implements UserMapper {
    public UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getFullName(),
                user.getUsername(),
                user.getPassword(),
                user.getIsAdmin(),
                String.valueOf(user.getStatus())
        );
    }

    public User toEntity(UserDto userDto) {
        return new User(
                userDto.getId(),
                userDto.getFullName(),
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getIsAdmin(),
                UserStatus.valueOf(userDto.getStatus())
        );
    }
}

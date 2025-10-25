package io.todolist.mapper;

import io.todolist.dto.UserDto;
import io.todolist.model.User;

public interface UserMapper {
    public UserDto toDto(User user);

    public User toEntity(UserDto userDto);
}

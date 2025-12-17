package io.todolist.users.mapper;

import io.todolist.common.contracts.dto.UserDto;
import io.todolist.users.model.User;

public interface UserMapper {
    public UserDto toDto(User user);

    public User toEntity(UserDto userDto);
}

package io.todolist.users.repository;

import io.todolist.common.contracts.dto.UserFilterDto;
import io.todolist.users.model.User;

import java.util.List;

// Custom interface for additional repository methods
public interface UserRepositoryCustom {
    /**
     * Filters users based on the criteria specified in the UserFilterDto.
     *
     * @param dto the filter criteria
     * @return a list of users matching the filter
     */
    List<User> filter(UserFilterDto dto);
}
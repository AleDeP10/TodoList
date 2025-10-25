package io.todolist.service;

import io.todolist.dto.UserDto;
import io.todolist.dto.UserFilterDto;
import io.todolist.mapper.UserMapper;
import io.todolist.model.User;
import io.todolist.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    /**
     * Saves or updates a user starting from a UserDto.
     * @param userDto the user DTO to save
     * @return the saved UserDto with any updates (e.g., generated id)
     */
    public UserDto save(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        User savedUser = userRepository.save(user);
        return userMapper.toDto(savedUser);
    }

    /**
     * Deletes a user by id.
     * @param id the id of the user to delete
     */
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    /**
     * Finds a user by id.
     * @param id the user id
     * @return an Optional containing the UserDto if found
     */
    public Optional<UserDto> findById(Integer id) {
        Optional<User> userOpt = userRepository.findById(id);
        return userOpt.map(userMapper::toDto);
    }

    /**
     * Returns all users.
     * @return list of UserDto
     */
    public List<UserDto> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(userMapper::toDto)
                .toList();
    }

    /**
     * Filters users using the custom filter.
     * @param filterDto DTO with filter criteria
     * @return list of filtered UserDto
     */
    public List<UserDto> filter(UserFilterDto filterDto) {
        List<User> filteredUsers = userRepository.filter(filterDto);
        return filteredUsers.stream()
                .map(userMapper::toDto)
                .toList();
    }

}


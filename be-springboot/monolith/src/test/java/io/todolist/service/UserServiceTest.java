package io.todolist.service;

import io.todolist.BaseTest;
import io.todolist.dto.UserDto;
import io.todolist.dto.UserFilterDto;
import io.todolist.model.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UserServiceTest extends BaseTest {
    @Autowired
    private UserService userService;

    private Integer savedUserId;

    private UserDto createTestUserDto() {
        UserDto userDto = new UserDto();
        userDto.setFullName("Test User");
        userDto.setUsername("testuser");
        userDto.setPassword("testuser");
        userDto.setIsAdmin(false);
        userDto.setStatus(String.valueOf(UserStatus.ACTIVE));
        return userDto;
    }

    @BeforeEach
    public void setup() {
        UserDto userDto = createTestUserDto();
        UserDto savedUser = userService.save(userDto);
        savedUserId = savedUser.getId();
    }

    @Test
    public void testSaveAndFindById() {
        Optional<UserDto> foundUserOpt = userService.findById(savedUserId);
        assertThat(foundUserOpt).isPresent();
        UserDto foundUser = foundUserOpt.get();
        assertThat(foundUser.getFullName()).isEqualTo("Test User");
        assertThat(foundUser.getUsername()).isEqualTo("testuser");
        assertThat(foundUser.getPassword()).isEqualTo("testuser");
        assertThat(foundUser.getIsAdmin()).isEqualTo(false);
        assertThat(foundUser.getStatus()).isEqualTo(String.valueOf(UserStatus.ACTIVE));
    }

    @Test
    public void testFindAll() {
        List<UserDto> allUsers = userService.findAll();
        assertThat(allUsers).isNotEmpty();
        assertThat(allUsers.stream().anyMatch(u -> u.getId().equals(savedUserId))).isTrue();
    }

    @Test
    public void testFilter() {
        UserFilterDto filterDto = new UserFilterDto();
        filterDto.setFullName("Test User");
        filterDto.setUsername("testuser");
        filterDto.setStateFilter(new String[]{String.valueOf(UserStatus.ACTIVE)});
        List<UserDto> filteredUsers = userService.filter(filterDto);
        assertThat(filteredUsers).isNotEmpty();
        assertThat(filteredUsers.stream().allMatch(u -> u.getUsername().contains("testuser"))).isTrue();
    }

    @Test
    public void testDeleteById() {
        userService.deleteById(savedUserId);
        Optional<UserDto> deletedUserOpt = userService.findById(savedUserId);
        assertThat(deletedUserOpt).isNotPresent();
    }
}
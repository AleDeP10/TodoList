package io.todolist.mapper;

import static org.junit.jupiter.api.Assertions.*;

import io.todolist.dto.UserDto;
import io.todolist.mapper.UserMapper;
import io.todolist.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class UserMapperTest {

    private UserMapper userMapper;

    @BeforeEach
    public void setUp() {
        userMapper = new UserMapper();
    }

    @Test
    public void testToDto() {
        User user = new User();
        user.setId(1);
        user.setFullName("Mario Rossi");
        user.setUsername("mrossi");
        user.setPassword("secret");
        user.setIsAdmin(true);
        user.setStatus("ACTIVE");

        UserDto dto = userMapper.toDto(user);

        assertNotNull(dto);
        assertEquals(user.getId(), dto.getId());
        assertEquals(user.getFullName(), dto.getFullName());
        assertEquals(user.getUsername(), dto.getUsername());
        assertEquals(user.getPassword(), dto.getPassword());
        assertEquals(user.getIsAdmin(), dto.getIsAdmin());
        assertEquals(user.getStatus(), dto.getStatus());
    }

    @Test
    public void testToEntity() {
        UserDto dto = new UserDto();
        dto.setId(2);
        dto.setFullName("Luigi Bianchi");
        dto.setUsername("lbianchi");
        dto.setPassword("secret");
        dto.setIsAdmin(false);
        dto.setStatus("INACTIVE");

        User user = userMapper.toEntity(dto);

        assertNotNull(user);
        assertEquals(dto.getId(), user.getId());
        assertEquals(dto.getFullName(), user.getFullName());
        assertEquals(dto.getUsername(), user.getUsername());
        assertEquals(dto.getPassword(), user.getPassword());
        assertEquals(dto.getIsAdmin(), user.getIsAdmin());
        assertEquals(dto.getStatus(), user.getStatus());
    }
}
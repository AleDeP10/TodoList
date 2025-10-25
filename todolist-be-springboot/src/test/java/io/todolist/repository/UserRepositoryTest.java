package io.todolist.repository;

import static org.assertj.core.api.Assertions.assertThat;

import io.todolist.dto.UserFilterDto;
import io.todolist.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveAndFindById() {
        User user = new User();
        user.setFullName("Test User");
        user.setUsername("testuser");
        user.setPassword("password");
        user.setIsAdmin(false);
        user.setStatus("ACTIVE");

        User savedUser = userRepository.save(user);

        Optional<User> foundUser = userRepository.findById(savedUser.getId());
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getUsername()).isEqualTo("testuser");
    }

    @Test
    public void testDelete() {
        User user = new User();
        user.setFullName("Delete User");
        user.setUsername("deleteuser");
        user.setPassword("password");
        user.setIsAdmin(false);
        user.setStatus("ACTIVE");

        User savedUser = userRepository.save(user);
        userRepository.delete(savedUser);

        Optional<User> foundUser = userRepository.findById(savedUser.getId());
        assertThat(foundUser).isNotPresent();
    }

    @Test
    public void testFindAllAndFilter() {
        User user1 = new User();
        user1.setFullName("Alice Smith");
        user1.setUsername("asmith");
        user1.setPassword("pass1");
        user1.setIsAdmin(true);
        user1.setStatus("ACTIVE");
        userRepository.save(user1);

        User user2 = new User();
        user2.setFullName("Bob Johnson");
        user2.setUsername("bjohnson");
        user2.setPassword("pass2");
        user2.setIsAdmin(false);
        user2.setStatus("BLOCKED");
        userRepository.save(user2);

        UserFilterDto filterDto = new UserFilterDto();
        filterDto.setUsername("smith");
        filterDto.setIsAdmin(true);
        filterDto.setStateFilter(new String[]{"ACTIVE"});

        var filteredUsers = userRepository.filter(filterDto);

        assertThat(filteredUsers).isNotEmpty();
        assertThat(filteredUsers).allMatch(u -> u.getUsername().toLowerCase().contains("smith"));
        assertThat(filteredUsers).allMatch(User::getIsAdmin);
        assertThat(filteredUsers).allMatch(u -> "ACTIVE".equals(u.getStatus()));

        List<User> allUsers = userRepository.findAll();
        filteredUsers = userRepository.filter(new UserFilterDto());

        assertThat(filteredUsers).isNotEmpty();
        assertThat(allUsers.size()).isEqualTo(filteredUsers.size());
    }
}
package io.todolist.repository;

import io.todolist.dto.TaskFilterDto;
import io.todolist.model.Task;
import io.todolist.model.TaskStatus;
import io.todolist.model.User;
import io.todolist.model.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

public class TaskRepositoryTest extends BaseRepositoryTest {

    public static Logger logger = LoggerFactory.getLogger(TaskRepositoryTest.class);

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private Integer assigneeId;

    @BeforeEach
    public void setupUser() {
        User user = new User();
        user.setFullName("Mario Rossi");
        user.setUsername("mrossi");
        user.setPassword("password");
        user.setIsAdmin(false);
        user.setStatus(UserStatus.ACTIVE);

        User savedUser = userRepository.save(user);
        assigneeId = savedUser.getId();
    }

    @Test
    public void testSaveAndFindById() {
        Task task = new Task();
        task.setDescription("Test Task");
        task.setAssigneeId(assigneeId);
        task.setStatus(TaskStatus.TODO);

        Task savedTask = taskRepository.save(task);

        Optional<Task> foundTask = taskRepository.findById(savedTask.getId());
        assertThat(foundTask).isPresent();
        assertThat(foundTask.get().getDescription()).isEqualTo("Test Task");
    }

    @Test
    public void testUpdateAndFindById() {
        Task task = new Task();
        task.setDescription("To Update Task");
        task.setAssigneeId(assigneeId);
        task.setStatus(TaskStatus.TODO);

        Task savedTask = taskRepository.save(task);
        savedTask.setDescription("Updated Task");
        Task updatedTask = taskRepository.save(savedTask);

        Optional<Task> foundTask = taskRepository.findById(updatedTask.getId());
        assertThat(foundTask).isPresent();
        assertThat(foundTask.get().getDescription()).isEqualTo("Updated Task");
    }

    @Test
    public void testDelete() {
        Task task = new Task();
        task.setDescription("Delete Task");
        task.setAssigneeId(assigneeId);
        task.setStatus(TaskStatus.TODO);

        Task savedTask = taskRepository.save(task);
        taskRepository.delete(savedTask);

        Optional<Task> foundTask = taskRepository.findById(savedTask.getId());
        assertThat(foundTask).isNotPresent();
    }

    @Test
    public void testFilter() {
        Task task1 = new Task();
        task1.setDescription("Task 1");
        task1.setAssigneeId(assigneeId);
        task1.setStatus(TaskStatus.IN_PROGRESS);
        taskRepository.save(task1);

        Task task2 = new Task();
        task2.setDescription("Task 2");
        task2.setAssigneeId(assigneeId);
        task2.setStatus(TaskStatus.TODO);
        taskRepository.save(task2);

        TaskFilterDto filterDto = new TaskFilterDto();
        filterDto.setDescription("Task");
        filterDto.setAssigneeId(assigneeId);
        filterDto.setStateFilter(new String[]{TaskStatus.IN_PROGRESS.toString()});

        var filteredTasks = taskRepository.filter(filterDto);

        assertThat(filteredTasks).isNotEmpty();
        assertThat(filteredTasks).allMatch(t -> t.getDescription().toLowerCase().contains("task"));
        assertThat(filteredTasks).allMatch(t -> t.getAssigneeId().equals(assigneeId));
        assertThat(filteredTasks).allMatch(t -> TaskStatus.IN_PROGRESS.equals(t.getStatus()));

        // Test getAll (findAll) and filter with empty filter
        var allTasks = taskRepository.findAll();
        var emptyFilter = new TaskFilterDto();
        var filteredAllTasks = taskRepository.filter(emptyFilter);

        assertThat(allTasks).isNotEmpty();
        assertThat(filteredAllTasks).isNotEmpty();
        assertThat(filteredAllTasks.size()).isEqualTo(allTasks.size());
    }
}
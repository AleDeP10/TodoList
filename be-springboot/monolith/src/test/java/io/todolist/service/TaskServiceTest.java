package io.todolist.service;

import io.todolist.BaseTest;
import io.todolist.dto.TaskDto;
import io.todolist.dto.TaskFilterDto;
import io.todolist.dto.UserDto;
import java.util.Optional;

import io.todolist.model.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class TaskServiceTest extends BaseTest {
    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    private Integer assigneeId;

    @BeforeEach
    public void setupUser() {
        UserDto user = new UserDto();
        user.setFullName("Mario Rossi");
        user.setUsername("mrossi");
        user.setPassword("password");
        user.setIsAdmin(false);
        user.setStatus(String.valueOf(UserStatus.ACTIVE));

        UserDto savedUser = userService.save(user);
        assigneeId = savedUser.getId();
    }

    @Test
    public void testSaveAndFindById() {
        TaskDto taskDto = new TaskDto();
        taskDto.setDescription("Test Task");
        taskDto.setAssigneeId(assigneeId);
        taskDto.setStatus("TODO");

        // Save task
        TaskDto savedTask = taskService.save(taskDto);
        assertThat(savedTask.getId()).isNotNull();

        // Find by id
        Optional<TaskDto> foundTaskOpt = taskService.findById(savedTask.getId());
        assertThat(foundTaskOpt).isPresent();
        TaskDto foundTask = foundTaskOpt.get();
        assertThat(foundTask.getDescription()).isEqualTo("Test Task");
        assertThat(foundTask.getAssigneeId()).isEqualTo(assigneeId);
        assertThat(foundTask.getStatus()).isEqualTo("TODO");
    }

    @Test
    public void testDeleteById() {
        TaskDto taskDto = new TaskDto();
        taskDto.setDescription("Task to delete");
        taskDto.setAssigneeId(assigneeId);
        taskDto.setStatus("TODO");

        TaskDto savedTask = taskService.save(taskDto);
        Integer taskId = savedTask.getId();
        assertThat(taskId).isNotNull();

        taskService.deleteById(taskId);

        Optional<TaskDto> deletedTask = taskService.findById(taskId);
        assertThat(deletedTask).isNotPresent();
    }

    @Test
    public void testFindAllAndFilter() {
        // Clean up any existing tasks
        taskService.findAll().forEach(t -> taskService.deleteById(t.getId()));

        // Create multiple tasks
        TaskDto task1 = new TaskDto();
        task1.setDescription("Task One");
        task1.setAssigneeId(assigneeId);
        task1.setStatus("TODO");
        taskService.save(task1);

        TaskDto task2 = new TaskDto();
        task2.setDescription("Task Two");
        task2.setAssigneeId(assigneeId);
        task2.setStatus("DONE");
        taskService.save(task2);

        // Test findAll
        var allTasks = taskService.findAll();
        assertThat(allTasks).hasSizeGreaterThanOrEqualTo(2);

        // Test filter with empty filter (should return all)
        TaskFilterDto emptyFilter = new TaskFilterDto();
        var filteredTasks = taskService.filter(emptyFilter);
        assertThat(filteredTasks).hasSizeGreaterThanOrEqualTo(2);

        // Test filter with status TODO
        TaskFilterDto statusFilter = new TaskFilterDto();
        statusFilter.setStateFilter(new String[]{"TODO"});
        var todoTasks = taskService.filter(statusFilter);
        assertThat(todoTasks).allMatch(t -> "TODO".equals(t.getStatus()));
    }
}
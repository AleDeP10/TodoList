package io.todolist.mapper;

import static org.junit.jupiter.api.Assertions.*;

import io.todolist.BaseTest;
import io.todolist.dto.TaskDto;
import io.todolist.model.Task;
import io.todolist.model.TaskStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class TaskMapperTest extends BaseTest {

    private TaskMapper taskMapper;

    @BeforeEach
    public void setUp() {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.scan("io.todolist.mapper");
        context.refresh();
        taskMapper = context.getBean(TaskMapper.class);
    }

    @Test
    public void testToDto() {
        Task task = new Task();
        task.setId(1);
        task.setDescription("Complete the report");
        task.setStatus(TaskStatus.TODO);
        task.setAssigneeId(42);

        TaskDto dto = taskMapper.toDto(task);

        assertNotNull(dto);
        assertEquals(task.getId(), dto.getId());
        assertEquals(task.getDescription(), dto.getDescription());
        assertEquals(task.getStatus().toString(), dto.getStatus());
        assertEquals(task.getAssigneeId(), dto.getAssigneeId());
    }

    @Test
    public void testToEntity() {
        TaskDto dto = new TaskDto();
        dto.setId(2);
        dto.setDescription("Review code");
        dto.setStatus("IN_PROGRESS");
        dto.setAssigneeId(7);

        Task task = taskMapper.toEntity(dto);

        assertNotNull(task);
        assertEquals(dto.getId(), task.getId());
        assertEquals(dto.getDescription(), task.getDescription());
        assertEquals(dto.getStatus(), task.getStatus().toString());
        assertEquals(dto.getAssigneeId(), task.getAssigneeId());
    }
}


package io.todolist.mapper;

import static org.junit.jupiter.api.Assertions.*;

import io.todolist.dto.TaskDto;
import io.todolist.mapper.TaskMapper;
import io.todolist.model.Task;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class TaskMapperTest {

    private TaskMapper taskMapper;

    @BeforeEach
    public void setUp() {
        taskMapper = new TaskMapper();
    }

    @Test
    public void testToDto() {
        Task task = new Task();
        task.setId(1);
        task.setDescription("Complete the report");
        task.setStatus("TODO");
        task.setAssigneeId(42);

        TaskDto dto = taskMapper.toDto(task);

        assertNotNull(dto);
        assertEquals(task.getId(), dto.getId());
        assertEquals(task.getDescription(), dto.getDescription());
        assertEquals(task.getStatus(), dto.getStatus());
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
        assertEquals(dto.getStatus(), task.getStatus());
        assertEquals(dto.getAssigneeId(), task.getAssigneeId());
    }
}


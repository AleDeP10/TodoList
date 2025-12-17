package io.todolist.tasks.mapper;

import io.todolist.common.contracts.dto.TaskDto;
import io.todolist.tasks.model.Task;
import io.todolist.tasks.model.TaskStatus;
import org.springframework.stereotype.Component;

@Component
public class TaskMapperImpl implements TaskMapper {
    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getDescription(),
                task.getAssigneeId(),
                String.valueOf(task.getStatus())
        );
    }

    public Task toEntity(TaskDto taskDto) {
        return new Task(
                taskDto.getId(),
                taskDto.getDescription(),
                taskDto.getAssigneeId(),
                TaskStatus.valueOf(taskDto.getStatus())
        );
    }
}

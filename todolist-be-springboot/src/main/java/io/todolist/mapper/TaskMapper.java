package io.todolist.mapper;

import io.todolist.dto.TaskDto;
import io.todolist.model.Task;

public class TaskMapper {

    public Task toEntity(TaskDto taskDto) {
        return new Task(
                taskDto.getId(),
                taskDto.getDescription(),
                taskDto.getAssigneeId(),
                taskDto.getStatus()
        );
    }

    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getDescription(),
                task.getAssigneeId(),
                task.getStatus()
        );
    }
}

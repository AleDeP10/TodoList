package io.todolist.mapper;

import io.todolist.dto.TaskDto;
import io.todolist.model.Task;

public interface TaskMapper {

    public Task toEntity(TaskDto taskDto);

    public TaskDto toDto(Task task);
}

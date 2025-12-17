package io.todolist.tasks.mapper;

import io.todolist.common.contracts.dto.TaskDto;
import io.todolist.tasks.model.Task;

public interface TaskMapper {

    public Task toEntity(TaskDto taskDto);

    public TaskDto toDto(Task task);
}

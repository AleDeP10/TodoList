package io.todolist.tasks.repository;

import io.todolist.common.contracts.dto.TaskFilterDto;
import io.todolist.tasks.model.Task;
import org.springframework.stereotype.Repository;

import java.util.List;

// Custom interface for additional repository methods
@Repository
public interface TaskRepositoryCustom {
    /**
     * Filters users based on the criteria specified in the TaskFilterDto.
     *
     * @param dto the filter criteria
     * @return a list of users matching the filter
     */
    List<Task> filter(TaskFilterDto dto);
}
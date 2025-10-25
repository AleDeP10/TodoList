package io.todolist.service;

import io.todolist.dto.TaskDto;
import io.todolist.dto.TaskFilterDto;
import io.todolist.mapper.TaskMapper;
import io.todolist.model.Task;
import io.todolist.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    /**
     * Saves or updates a task starting from a TaskDto.
     * @param taskDto the task DTO to save
     * @return the saved TaskDto with any updates (e.g., generated id)
     */
    public TaskDto save(TaskDto taskDto) {
        Task task = taskMapper.toEntity(taskDto);
        Task savedTask = taskRepository.save(task);
        return taskMapper.toDto(savedTask);
    }

    /**
     * Deletes a task by id.
     * @param id the id of the task to delete
     */
    public void deleteById(Integer id) {
        taskRepository.deleteById(id);
    }

    /**
     * Finds a task by id.
     * @param id the task id
     * @return an Optional containing the TaskDto if found
     */
    public Optional<TaskDto> findById(Integer id) {
        Optional<Task> taskOpt = taskRepository.findById(id);
        return taskOpt.map(taskMapper::toDto);
    }

    /**
     * Returns all tasks.
     * @return list of TaskDto
     */
    public List<TaskDto> findAll() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(taskMapper::toDto)
                .toList();
    }

    /**
     * Filters tasks using the custom filter.
     * @param filterDto DTO with filter criteria
     * @return list of filtered TaskDto
     */
    public List<TaskDto> filter(TaskFilterDto filterDto) {
        List<Task> filteredTasks = taskRepository.filter(filterDto);
        return filteredTasks.stream()
                .map(taskMapper::toDto)
                .toList();
    }

}


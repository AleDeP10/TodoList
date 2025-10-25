package io.todolist.controller;

import io.todolist.dto.TaskDto;
import io.todolist.dto.TaskFilterDto;
import io.todolist.service.TaskService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        TaskDto savedTask = taskService.save(taskDto);
        return ResponseEntity.ok(savedTask);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Integer id) {
        Optional<TaskDto> taskOpt = taskService.findById(id);
        return taskOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        List<TaskDto> tasks = taskService.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/filter")
    public ResponseEntity<List<TaskDto>> filterTasks(@RequestBody TaskFilterDto filterDto) {
        List<TaskDto> filteredTasks = taskService.filter(filterDto);
        return ResponseEntity.ok(filteredTasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Integer id, @RequestBody TaskDto taskDto) {
        taskDto.setId(id);
        Optional<TaskDto> existingTask = taskService.findById(id);
        if (existingTask.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        try {
            TaskDto updatedTask = taskService.save(taskDto);
            return ResponseEntity.ok(updatedTask);
        } catch (DataIntegrityViolationException e) {
            Throwable rootCause = e.getRootCause();
            if (rootCause != null && rootCause.getMessage() != null && rootCause.getMessage().contains("task_assignee")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Assignee ID does not exist"));
            }
            throw e;
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        Optional<TaskDto> taskOpt = taskService.findById(id);
        if (taskOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        taskService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
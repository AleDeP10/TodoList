package io.todolist.tasks.controller;

import io.todolist.common.contracts.dto.TaskDto;
import io.todolist.common.contracts.dto.TaskFilterDto;
import io.todolist.tasks.publisher.TaskPublisher;
import io.todolist.tasks.service.TaskService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    private final TaskPublisher publisher;

    public TaskController(TaskPublisher publisher, TaskService taskService) {
        this.publisher = publisher;
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<TaskDto> create(@RequestBody TaskDto taskDto) {
        TaskDto savedTask = taskService.save(taskDto);
        return ResponseEntity.ok(savedTask);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Void> retrieve(@PathVariable UUID id) {
        UUID correlationId = publisher.publishTaskRetrieve(id);
        return ResponseEntity.accepted().header("X-Correlation-Id", correlationId.toString()).build();
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAll() {
        List<TaskDto> tasks = taskService.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/filter")
    public ResponseEntity<List<TaskDto>> filter(@RequestBody TaskFilterDto filterDto) {
        List<TaskDto> filteredTasks = taskService.filter(filterDto);
        return ResponseEntity.ok(filteredTasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody TaskDto taskDto) {
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
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Optional<TaskDto> taskOpt = taskService.findById(id);
        if (taskOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        taskService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/tasks/{id}/advance")
    public ResponseEntity<Void> advance(@PathVariable UUID id) {
        UUID correlationId = publisher.publishTaskMoveNext(id);
        return ResponseEntity.accepted().header("X-Correlation-Id", correlationId.toString()).build();
    }
}
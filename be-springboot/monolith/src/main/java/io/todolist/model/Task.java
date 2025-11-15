package io.todolist.model;

import io.todolist.hibernate.type.TaskStatusType;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "tasks", schema = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "description", length = 50, nullable = false)
    private String description;

    @Column(name = "assignee_id")
    private Integer assigneeId;

    @Type(value = TaskStatusType.class)
    @Column(name = "status", nullable = false, columnDefinition = "task_status")
    private TaskStatus status = TaskStatus.TODO;

    // Constructors
    public Task() {
    }

    public Task(Integer id, String description, Integer assigneeId, TaskStatus status) {
        this.id = id;
        this.description = description;
        this.assigneeId = assigneeId;
        this.status = status;
    }

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Integer assigneeId) {
        this.assigneeId = assigneeId;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }
}

package io.todolist.model;

import jakarta.persistence.*;

@Entity
@Table(name = "\"Task\"")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "description", length = 50, nullable = false)
    private String description;

    @Column(name = "assigneeId")
    private Integer assigneeId;


    @Column(name = "status", length = 12, columnDefinition = "varchar(12) default 'TODO'")
    private String status = "TODO";

    // Constructors
    public Task() {
    }

    public Task(Integer id, String description, Integer assigneeId, String status) {
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

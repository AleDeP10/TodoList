package io.todolist.dto;

public class TaskDto {

    private Integer id;
    private String description;
    private String status;
    private Integer assigneeId;

    public TaskDto() {
    }

    public TaskDto(Integer id, String description, Integer assigneeId, String status) {
        this.id = id;
        this.description = description;
        this.assigneeId = assigneeId;
        this.status = status;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Integer assigneeId) {
        this.assigneeId = assigneeId;
    }
}
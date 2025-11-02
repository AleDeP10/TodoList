package io.todolist.dto;

public class TaskFilterDto {

    private String description;
    private Integer assigneeId;
    private String[] stateFilter;

    public TaskFilterDto() {
    }

    public TaskFilterDto(String description, Integer assigneeId, String[] stateFilter) {
        this.description = description;
        this.assigneeId = assigneeId;
        this.stateFilter = stateFilter;
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

    public String[] getStateFilter() {
        return stateFilter;
    }

    public void setStateFilter(String[] stateFilter) {
        this.stateFilter = stateFilter;
    }
}

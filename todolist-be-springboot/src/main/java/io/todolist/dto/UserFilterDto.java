package io.todolist.dto;

public class UserFilterDto {

    private String username;
    private String fullName;
    private Boolean isAdmin;
    private String[] stateFilter;

    public UserFilterDto() {
    }

    public UserFilterDto(String username, String fullName, Boolean isAdmin, String[] stateFilter) {
        this.username = username;
        this.fullName = fullName;
        this.isAdmin = isAdmin;
        this.stateFilter = stateFilter;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String[] getStateFilter() {
        return stateFilter;
    }

    public void setStateFilter(String[] stateFilter) {
        this.stateFilter = stateFilter;
    }
}

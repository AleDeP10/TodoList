package io.todolist.dto;

public class UserFilterDto {


    private String fullName;
    private String username;
    private Boolean isAdmin;
    private String[] stateFilter;

    public UserFilterDto() {
    }

    public UserFilterDto(String fullName, String username, Boolean isAdmin, String[] stateFilter) {
        this.fullName = fullName;
        this.username = username;
        this.isAdmin = isAdmin;
        this.stateFilter = stateFilter;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

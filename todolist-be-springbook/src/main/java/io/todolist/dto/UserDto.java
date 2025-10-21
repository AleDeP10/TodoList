package io.todolist.dto;

public class UserDto {

    private Integer id;
    private String fullName;
    private String username;
    private String password;
    private Boolean isAdmin;
    private String status;

    public UserDto() {
    }

    public UserDto(Integer id, String fullName, String username, String password, Boolean isAdmin, String status) {
        this.id = id;
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}

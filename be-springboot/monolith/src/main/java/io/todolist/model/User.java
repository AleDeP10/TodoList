package io.todolist.model;

import io.todolist.hibernate.type.UserStatusType;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "users", schema = "\"user\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "full_name", length = 50)
    private String fullName;

    @Column(name = "username", length = 20, nullable = false)
    private String username;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "is_admin")
    private Boolean isAdmin = false;

    @Type(value = UserStatusType.class)
    @Column(name = "status", nullable = false, columnDefinition = "user_status")
    private UserStatus status = UserStatus.ACTIVE;

    // Constructors
    public User() { }

    public User(Integer id, String fullName, String username, String password, Boolean isAdmin, UserStatus status) {
        this.id = id;
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        this.status = status;
    }

    // Getters and setters

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

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }
}

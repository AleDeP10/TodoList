package io.todolist.hibernate.type;

import io.todolist.model.UserStatus;

public class UserStatusType extends PostgreSQLEnumType<UserStatus> {
    public UserStatusType() {
        super(UserStatus.class, "user_status");
    }
}

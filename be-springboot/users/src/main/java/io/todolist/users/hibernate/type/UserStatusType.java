package io.todolist.users.hibernate.type;

import io.todolist.common.core.hibernate.type.PostgreSQLEnumType;
import io.todolist.users.model.UserStatus;

public class UserStatusType extends PostgreSQLEnumType<UserStatus> {
    public UserStatusType() {
        super(UserStatus.class, "user_status");
    }
}

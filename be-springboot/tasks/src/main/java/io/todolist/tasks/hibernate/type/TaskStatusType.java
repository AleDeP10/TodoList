package io.todolist.tasks.hibernate.type;

import io.todolist.common.core.hibernate.type.PostgreSQLEnumType;
import io.todolist.tasks.model.TaskStatus;

public class TaskStatusType extends PostgreSQLEnumType<TaskStatus> {
    public TaskStatusType() {
        super(TaskStatus.class, "task_status");
    }
}

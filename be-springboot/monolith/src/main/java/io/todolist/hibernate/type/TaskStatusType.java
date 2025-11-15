package io.todolist.hibernate.type;

import io.todolist.model.TaskStatus;

public class TaskStatusType extends PostgreSQLEnumType<TaskStatus> {
    public TaskStatusType() {
        super(TaskStatus.class, "task_status");
    }
}

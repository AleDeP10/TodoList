package io.todolist.common.contracts.events;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

/**
 * Event representing a request to advance the status of a specific Task.
 * Includes a timestamp to distinguish multiple events on the same task.
 */
public class TaskAdvanceEvent {

    private final UUID taskId;
    private final Instant eventTimestamp;

    public TaskAdvanceEvent(UUID taskId, Instant eventTimestamp) {
        this.taskId = taskId;
        this.eventTimestamp = eventTimestamp;
    }

    public UUID getTaskId() {
        return taskId;
    }

    public Instant getEventTimestamp() {
        return eventTimestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskAdvanceEvent that = (TaskAdvanceEvent) o;
        return Objects.equals(taskId, that.taskId) &&
                Objects.equals(eventTimestamp, that.eventTimestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(taskId, eventTimestamp);
    }

    @Override
    public String toString() {
        return "TaskMoveNextEvent{" +
                "taskId=" + taskId +
                ", eventTimestamp=" + eventTimestamp +
                '}';
    }
}

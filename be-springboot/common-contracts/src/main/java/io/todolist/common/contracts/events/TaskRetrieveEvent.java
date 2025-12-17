package io.todolist.common.contracts.events;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

/**
 * Event representing a request to retrieve a Task by its ID.
 * Includes a correlation ID for request-response matching and a timestamp to distinguish multiple events.
 * Used for asynchronous communication between Control Tower and Task Service via RabbitMQ.
 */
public class TaskRetrieveEvent {

    private final UUID taskId;
    private final Instant eventTimestamp;

    public TaskRetrieveEvent(UUID taskId, Instant eventTimestamp) {
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
        TaskRetrieveEvent that = (TaskRetrieveEvent) o;
        return Objects.equals(taskId, that.taskId) &&
                Objects.equals(eventTimestamp, that.eventTimestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(taskId, eventTimestamp);
    }

    @Override
    public String toString() {
        return "TaskRetrieveEvent{" +
                "taskId=" + taskId +
                ", eventTimestamp=" + eventTimestamp +
                '}';
    }
}

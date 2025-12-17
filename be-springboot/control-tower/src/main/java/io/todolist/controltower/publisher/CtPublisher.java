package io.todolist.controltower.publisher;

import io.todolist.common.contracts.config.RabbitMQConfig;
import io.todolist.common.contracts.events.TaskAdvanceEvent;
import io.todolist.common.contracts.events.TaskRetrieveEvent;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class CtPublisher {
    private final RabbitTemplate rabbitTemplate;

    public CtPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public UUID publishTaskRetrieve(UUID taskId) {
        UUID correlationId = UUID.randomUUID();
        TaskRetrieveEvent evt = new TaskRetrieveEvent(taskId, Instant.now());
        Message msg = MessageBuilder.withBody(serialize(evt))
                .setHeader("correlationId", correlationId.toString())
                .setHeader("type", "TaskRetrieveEvent")
                .build();
        rabbitTemplate.send(RabbitMQConfig.EX_CT_TASKS, RabbitMQConfig.RK_TASK_RETRIEVE_EVENT, msg);
        return correlationId;
    }

    public UUID publishTaskMoveNext(UUID taskId) {
        UUID correlationId = UUID.randomUUID();
        TaskAdvanceEvent evt = new TaskAdvanceEvent(taskId, Instant.now());
        Message msg = MessageBuilder.withBody(serialize(evt))
                .setHeader("correlationId", correlationId.toString())
                .setHeader("type", "TaskAdvanceEvent")
                .build();
        rabbitTemplate.send(RabbitMQConfig.EX_CT_TASKS, RabbitMQConfig.RK_TASK_ADVANCE_EVENT, msg);
        return correlationId;
    }

    private byte[] serialize(Object o) { /* TODO: JSON serialize with Jackson */
        return new byte[0];
    }
}


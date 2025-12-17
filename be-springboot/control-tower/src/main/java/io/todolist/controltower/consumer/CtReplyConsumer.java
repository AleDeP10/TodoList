package io.todolist.controltower.consumer;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class CtReplyConsumer {
    @RabbitListener(queues = "ct.reply.q")
    public void onReply(Message message) {
        String type = (String) message.getMessageProperties().getHeaders().get("type");
        String correlationId = (String) message.getMessageProperties().getHeaders().get("correlationId");
        switch (type) {
            case "TaskMovedEvent":
                // TODO: aggiorna audit + eventuale cache/stato per la richiesta correlata
                break;
            case "TaskRetrievedEvent":
                // TODO: deserializza payload, memorizza DTO temporaneamente correlato
                break;
            default:
                // TODO: log warning + instrada a DLQ se necessario
        }
    }
}


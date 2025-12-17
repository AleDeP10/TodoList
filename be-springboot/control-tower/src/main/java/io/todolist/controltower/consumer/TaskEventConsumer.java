package io.todolist.controltower.consumer;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;
@Component
public class TaskEventConsumer {
    @RabbitListener(queues = "task.service.move.q")
    public void onTaskAdvanceEvent(@Payload String message,
                                   @Header(AmqpHeaders.CORRELATION_ID) String correlationId) {
        // Logica di gestione evento TaskAdvanceEvent
        System.out.println("Ricevuto TaskAdvanceEvent con correlationId: " + correlationId);
        System.out.println("Messaggio: " + message);
        // Qui si può inserire la logica di orchestrazione,
        // ad esempio pubblicare un TaskRetrieveEvent o aggiornare lo stato interno
    }
}

package io.todolist.common.contracts.config;

import org.springframework.amqp.core.*; import org.springframework.context.annotation.Bean; import org.springframework.context.annotation.Configuration;

@Configuration public class RabbitMQConfig { public static final String EX_CT_TASKS = "ct.tasks"; public static final String EX_CT_REPLIES = "ct.replies"; public static final String EX_CT_DLX = "ct.dlx";
    public static final String RK_TASK_ADVANCE_EVENT = "task.advance.event";
    public static final String RK_TASK_RETRIEVE_EVENT = "task.retrieve.event";
    public static final String RK_TASK_ADVANCED_RESPONSE = "task.advanced.response";
    public static final String RK_TASK_RETRIEVED_RESPONSE = "task.retrieved.response";

    @Bean
    TopicExchange ctTasks() {
        return new TopicExchange(EX_CT_TASKS, true, false);
    }

    @Bean
    TopicExchange ctReplies() {
        return new TopicExchange(EX_CT_REPLIES, true, false);
    }

    @Bean
    TopicExchange ctDlx() {
        return new TopicExchange(EX_CT_DLX, true, false);
    }

    @Bean
    Queue taskServiceAdvanceQ() {
        return QueueBuilder.durable("task.service.advance.q")
                .withArgument("x-dead-letter-exchange", EX_CT_DLX)
                .withArgument("x-dead-letter-routing-key", RK_TASK_ADVANCE_EVENT + ".dlx")
                .build();
    }

    @Bean
    Queue taskServiceRetrieveQ() {
        return QueueBuilder.durable("task.service.retrieve.q")
                .withArgument("x-dead-letter-exchange", EX_CT_DLX)
                .withArgument("x-dead-letter-routing-key", RK_TASK_RETRIEVE_EVENT + ".dlx")
                .build();
    }

    @Bean
    Queue ctReplyQ() {
        return QueueBuilder.durable("ct.reply.q").build();
    }

    @Bean
    Binding bindAdvance(Queue taskServiceAdvanceQ, TopicExchange ctTasks) {
        return BindingBuilder.bind(taskServiceAdvanceQ).to(ctTasks).with(RK_TASK_ADVANCE_EVENT);
    }

    @Bean
    Binding bindRetrieve(Queue taskServiceRetrieveQ, TopicExchange ctTasks) {
        return BindingBuilder.bind(taskServiceRetrieveQ).to(ctTasks).with(RK_TASK_RETRIEVE_EVENT);
    }

    @Bean
    Binding bindReplies(Queue ctReplyQ, TopicExchange ctReplies) {
        return BindingBuilder.bind(ctReplyQ).to(ctReplies).with("task.*.response");
    }
}
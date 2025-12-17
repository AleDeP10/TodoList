package io.todolist.tasks.config;

import io.todolist.tasks.mapper.TaskMapper;
import io.todolist.tasks.mapper.TaskMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TaskConfig {

    @Bean
    public TaskMapper taskMapper() {
        return new TaskMapperImpl();
    }
}
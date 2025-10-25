package io.todolist.config;

import io.todolist.mapper.TaskMapper;
import io.todolist.mapper.TaskMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TaskConfig {

    @Bean
    public TaskMapper taskMapper() {
        return new TaskMapperImpl();
    }
}
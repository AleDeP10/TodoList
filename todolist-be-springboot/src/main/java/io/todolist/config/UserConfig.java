package io.todolist.config;

import io.todolist.mapper.UserMapper;
import io.todolist.mapper.UserMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

    @Bean
    public UserMapper userMapper() {
        return new UserMapperImpl();
    }
}
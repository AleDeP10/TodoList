package io.todolist.users.config;

import io.todolist.users.mapper.UserMapper;
import io.todolist.users.mapper.UserMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

    @Bean
    public UserMapper userMapper() {
        return new UserMapperImpl();
    }
}
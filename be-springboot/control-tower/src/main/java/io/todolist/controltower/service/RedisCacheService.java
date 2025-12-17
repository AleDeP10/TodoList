package io.todolist.controltower.service;

import io.todolist.common.contracts.dto.TaskDto;
import io.todolist.common.contracts.dto.UserDto;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

/**
 * RedisCacheService provides a simple abstraction layer for caching UserDto and TaskDto objects in Redis.
 * It leverages Spring Data Redis's RedisTemplate to perform basic cache operations such as saving,
 * retrieving, and deleting cached data with configurable time-to-live (TTL) values.
 * <p>
 * This service supports temporary caching of partial or intermediate data needed for orchestration flows,
 * improving performance by reducing repeated calls to microservices for frequently accessed or short-lived data.
 * <p>
 * Usage:
 * - Save objects with optional TTL (default values provided).
 * - Retrieve cached objects by key.
 * - Delete cached objects by key.
 * <p>
 * Note:
 * - Ensure RedisTemplate is properly configured with appropriate serializers.
 * - Use meaningful cache keys to avoid collisions.
 * - TTL values should be chosen based on data freshness requirements.
 */
@Service
public class RedisCacheService {
    private final RedisTemplate<String, Object> redisTemplate;
    public RedisCacheService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // UserDto Cache Operations
    public void saveUserDto(String key, UserDto userDto) {
        saveUserDto(key, userDto, 3600); 
    }
    public void saveUserDto(String key, UserDto userDto, long ttlSeconds) {
        redisTemplate.opsForValue().set(key, userDto, Duration.ofSeconds(ttlSeconds));
    }
    public UserDto getUserDto(String key) {
        return (UserDto) redisTemplate.opsForValue().get(key);
    }
    public void deleteUserDto(String key) {
        redisTemplate.delete(key);
    }

    // TaskDto Cache Operations
    public void saveTaskDto(String key, TaskDto taskDto) {
        saveTaskDto(key, taskDto, 600);
    }
    public void saveTaskDto(String key, TaskDto taskDto, long ttlSeconds) {
        redisTemplate.opsForValue().set(key, taskDto, Duration.ofSeconds(ttlSeconds));
    }
    public TaskDto getTaskDto(String key) {
        return (TaskDto) redisTemplate.opsForValue().get(key);
    }
    public void deleteTaskDto(String key) {
        redisTemplate.delete(key);
    }
}


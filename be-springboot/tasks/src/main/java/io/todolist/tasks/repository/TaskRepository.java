package io.todolist.tasks.repository;

import io.todolist.tasks.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>, TaskRepositoryCustom {

}

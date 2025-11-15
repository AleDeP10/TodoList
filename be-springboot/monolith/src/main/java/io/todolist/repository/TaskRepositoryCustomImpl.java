package io.todolist.repository;

import io.todolist.dto.TaskFilterDto;
import io.todolist.model.Task;
import io.todolist.model.TaskStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TaskRepositoryCustomImpl implements TaskRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Task> filter(TaskFilterDto dto) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Task> cq = cb.createQuery(Task.class);
        Root<Task> task = cq.from(Task.class);

        List<Predicate> predicates = new ArrayList<>();

        // Filter by description with case-insensitive partial match
        if (dto.getDescription() != null && !dto.getDescription().isBlank()) {
            predicates.add(cb.like(cb.lower(task.get("description")), "%" + dto.getDescription().toLowerCase() + "%"));
        }

        // Filter by assigneeId
        if (dto.getAssigneeId() != null) {
            predicates.add(cb.equal(task.get("assigneeId"), dto.getAssigneeId()));
        }

        // Filter by status values if provided
        if (dto.getStateFilter() != null && dto.getStateFilter().length > 0) {
            TaskStatus[] statuses = Arrays.stream(dto.getStateFilter())
                    .map(TaskStatus::valueOf)
                    .toArray(TaskStatus[]::new);
            predicates.add(task.get("status").in((Object[]) statuses));
        }

        cq.where(predicates.toArray(new Predicate[0]));
        cq.orderBy(cb.asc(task.get("id")));

        return entityManager.createQuery(cq).getResultList();
    }
}

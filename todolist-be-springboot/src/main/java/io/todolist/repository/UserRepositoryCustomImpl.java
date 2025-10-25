package io.todolist.repository;

import io.todolist.dto.UserFilterDto;
import io.todolist.model.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of the custom repository interface.
 * Uses JPA Criteria API to build dynamic queries based on filter criteria.
 */
@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> filter(UserFilterDto dto) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);
        Root<User> user = cq.from(User.class);

        List<Predicate> predicates = new ArrayList<>();

        // Filter by username with case-insensitive partial match
        if (dto.getUsername() != null && !dto.getUsername().isBlank()) {
            predicates.add(cb.like(cb.lower(user.get("username")), "%" + dto.getUsername().toLowerCase() + "%"));
        }

        // Filter by full name with case-insensitive partial match
        if (dto.getFullName() != null && !dto.getFullName().isBlank()) {
            predicates.add(cb.like(cb.lower(user.get("fullName")), "%" + dto.getFullName().toLowerCase() + "%"));
        }

        // Filter by admin status if specified
        if (dto.getIsAdmin() != null) {
            predicates.add(cb.equal(user.get("isAdmin"), dto.getIsAdmin()));
        }

        // Filter by status values if provided
        if (dto.getStateFilter() != null && dto.getStateFilter().length > 0) {
            predicates.add(user.get("status").in((Object[]) dto.getStateFilter()));
        }

        cq.where(predicates.toArray(new Predicate[0]));
        cq.orderBy(cb.asc(user.get("id")));

        return entityManager.createQuery(cq).getResultList();
    }
}
/**
 * userHooks.ts
 *
 * 👥 Context:
 * This module provides a set of hooks for managing user entities,
 * including fetching, filtering, saving, deleting, and validating uniqueness.
 * It builds on the generic entity hooks and integrates Redux and React Query.
 *
 * ✅ Solves:
 * - Centralized user lifecycle management
 * - Consistent loading and error feedback via Redux
 * - Automatic cache invalidation and localized messaging
 * - Dynamic filtering based on full name, username, and status
 * - Validation of username uniqueness for form-level checks
 *
 * ⚙️ Hooks included:
 * - `useUsers`: fetches all users with loading/error handling
 * - `useFilteredUsers`: filters users based on Redux-driven criteria
 * - `useSaveUser`: handles user creation and update
 * - `useDeleteUser`: handles user deletion
 * - `useIsUsernameUnique`: checks if a username is already taken
 * - `useUserList`: retrieves full user list for dropdowns or lookups
 *
 * 🧠 Notes:
 * - `evalFilter`: applies compound logic for filtering users by name, username, and status map
 * - `useIsUsernameUnique`: used to enforce uniqueness constraints in forms, excluding current user if needed
 *
 * 📦 Usage:
 * ```tsx
 * const users = useFilteredUsers();
 * const saveUser = useSaveUser();
 * const isUnique = useIsUsernameUnique();
 * ```
 */

import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  useDeleteEntity,
  useEntities,
  useFilteredEntities,
  useSaveEntity,
} from "./useEntities";
import type { UserDto } from "@/lib/types/dto/UserDto";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/api/users";
import { getUserFilters } from "@/store/user/getUserFilters";
import { UserFilters } from "@/lib/types/filters/UserFilters";

/**
 * Applies user filters for fullName, username and status.
 */
const evalFilter = (task: UserDto, filters: UserFilters) => {
  const fullNameMatch = task.fullName
    .toLowerCase()
    .includes(filters.fullName.toLowerCase());

  const usernameMatch = task.username
    .toLowerCase()
    .includes(filters.username.toLowerCase());

  let statusMatch = true;
  if (
    !Object.values(filters.statusMap).every((v) => v === false) &&
    !Object.values(filters.statusMap).every((v) => v === true)
  ) {
    statusMatch = filters.statusMap[task.status];
  }

  return fullNameMatch && usernameMatch && statusMatch;
};

/**
 * Hook to fetch all users with loading and error handling.
 */
export const useUsers = () =>
  useEntities<UserDto>("user", fetchUsers, ["users"]);

/**
 * Hook to fetch and filter users based on current Redux filters.
 */
export const useFilteredUsers = () => {
  const filters = useSelector(getUserFilters);
  return useFilteredEntities<UserDto, UserFilters>(
    useUsers,
    filters,
    evalFilter
  );
};

/**
 * Hook to save a user (create or update) with feedback and cache invalidation.
 */
export const useSaveUser = () =>
  useSaveEntity<UserDto>("user", createUser, updateUser, ["users"]);

/**
 * Hook to delete a user with feedback and cache invalidation.
 */
export const useDeleteUser = () =>
  useDeleteEntity("user", deleteUser, ["users"]);

/**
 * Hook to check if a username is unique among existing users.
 */
export const useIsUsernameUnique = () => {
  const { data: users = [], isFetching } = useUsers();

  return useCallback(
    (username: string, excludeId?: number) => {
      if (isFetching) return true;
      return !users.some(
        (user) =>
          user.username === username &&
          (excludeId === undefined || user.id !== excludeId)
      );
    },
    [users, isFetching]
  );
};

/**
 * Hook to retrieve the full list of users for dropdowns, assignments or lookups.
 * Returns users along with loading and error state.
 */
export const useUserList = () => {
  const { data: users = [], isFetching, isError, error } = useUsers();

  return {
    users,
    isFetching,
    isError,
    error,
  };
};

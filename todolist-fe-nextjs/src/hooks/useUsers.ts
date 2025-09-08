import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDeleteEntity, useEntities, useFilteredEntities, useSaveEntity } from "./useEntities";
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

  const statusMatch = filters.statusMap[task.status];

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

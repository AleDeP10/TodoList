import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { UserDto } from "@/types/dto/UserDto";
import { getUserFilters } from "@/store/user";
import {
  useEntities,
  useSaveEntity,
  useDeleteEntity
} from "@/hooks/useEntities";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api/users";

export const useUsersWithFilters = () => {
  const { data = [], ...query } = useUsers();
  const filters = useSelector(getUserFilters);

  const filteredUsers = data.filter((user: UserDto) => {
    const usernameMatch = user.username.toLowerCase().includes(filters.username.toLowerCase());
    const fullNameMatch =
      user.fullName?.toLowerCase().includes(filters.fullName.toLowerCase()) ?? true;
    const statusMatch = filters.statusMap[user.status];
    return usernameMatch && fullNameMatch && statusMatch;
  });

  return {
    data: filteredUsers,
    ...query,
  };
};


export const useUsers = () =>
  useEntities<UserDto>("User", fetchUsers);

export const useSaveUser = () =>
  useSaveEntity<UserDto>("User", createUser, updateUser);

export const useDeleteUser = () =>
  useDeleteEntity("User", deleteUser);
import { useSelector } from "react-redux";
import type { UserDto } from "@/types/dto/UserDto";
import { UserFilters } from "@/types/filters/UserFilters";
import { getUserFilters } from "@/store/user";
import {
  useEntities,
  useSaveEntity,
  useDeleteEntity,
  useFilteredEntities,
} from "@/hooks/useEntities";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api/users";

const evalFilter = (user: UserDto, filters: UserFilters) => {
  const usernameMatch = user.username
    .toLowerCase()
    .includes(filters.username.toLowerCase());
  const fullNameMatch = user.fullName
    .toLowerCase()
    .includes(filters.fullName.toLowerCase());
  const statusMatch = filters.statusMap[user.status];
  return usernameMatch && fullNameMatch && statusMatch;
};

export const useUsers = () => useEntities<UserDto>("User", fetchUsers);

export const useFilteredUsers = () => {
  const filters = useSelector(getUserFilters);
  return useFilteredEntities<UserDto, UserFilters>(
    useUsers,
    filters,
    evalFilter
  );
};

export const useSaveUser = () =>
  useSaveEntity<UserDto>("User", createUser, updateUser);

export const useDeleteUser = () => useDeleteEntity("User", deleteUser);

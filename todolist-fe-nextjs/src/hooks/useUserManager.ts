import { useEntityManager } from "./useEntityManager";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api/users";
import type { UserDto } from "@/types/dto/UserDto";

export const useUserManager = () => {
  return useEntityManager<UserDto>("User", {
    fetchAll: getUsers,
    create: createUser,
    update: updateUser,
    remove: deleteUser,
  });
}
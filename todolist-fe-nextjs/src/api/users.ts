import { axiosClient } from "./axiosClient";
import type { UserDto } from "@/lib/types/dto/UserDto";

export const fetchUsers = async (): Promise<UserDto[]> => {
  const res = await axiosClient.post("/user/filter", {});
  return res.data;
};

export const createUser = async (user: UserDto): Promise<UserDto> => {
  const res = await axiosClient.post("/user", user);
  return res.data;
};

export const updateUser = async (user: UserDto): Promise<void> => {
  await axiosClient.put(`/user/${user.id}`, {... user, tasks: []});
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosClient.delete(`/user/${id}`);
};

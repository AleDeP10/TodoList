import { axiosClient } from "./axiosClient";
import type { UserDto } from "@/lib/types/dto/UserDto";

export const fetchUsers = async (): Promise<UserDto[]> => {
  const res = await axiosClient.post("/User/filter", {});
  return res.data;
};

export const createUser = async (user: UserDto): Promise<UserDto> => {
  const res = await axiosClient.post("/User", user);
  return res.data;
};

export const updateUser = async (user: UserDto): Promise<void> => {
  await axiosClient.put(`/User/${user.id}`, {... user, tasks: null});
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosClient.delete(`/User/${id}`);
};

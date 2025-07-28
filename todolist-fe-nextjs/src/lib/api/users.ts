import { axiosClient } from './axiosClient';
import type { UserDto } from '@/types/dto/UserDto';

export const getUsers = async (): Promise<UserDto[]> => {
  const res = await axiosClient.post('/User/filter', {});
  return res.data;
}

export const createUser = async (user: UserDto): Promise<UserDto> => {
  const res = await axiosClient.post('/User', user);
  return res.data;
}

export const updateUser = async (id: number, user: UserDto): Promise<void> => {
  await axiosClient.put(`/User/${id}`, user);
}

export const deleteUser = async (id: number): Promise<void> => {
  await axiosClient.delete(`/User/${id}`);
}

import { axiosClient } from './axiosClient';
import type { UserDto } from '@/types/dto/UserDto';

export async function getUsers(): Promise<UserDto[]> {
  const res = await axiosClient.post('/User/filter', {});
  return res.data;
}

export async function createUser(user: UserDto): Promise<UserDto> {
  const res = await axiosClient.post('/User', user);
  return res.data;
}

export async function updateUser(id: number, user: UserDto): Promise<void> {
  await axiosClient.put(`/User/${id}`, user);
}

export async function deleteUser(id: number): Promise<void> {
  await axiosClient.delete(`/User/${id}`);
}

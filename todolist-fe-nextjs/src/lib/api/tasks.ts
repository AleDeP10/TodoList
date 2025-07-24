import { axiosClient } from './axiosClient';
import type { TaskDto } from '@/types/dto/TaskDto';

export async function getTasks(): Promise<TaskDto[]> {
  const res = await axiosClient.post('/Task/filter', {});
  return res.data;
}

export async function createTask(task: TaskDto): Promise<TaskDto> {
  const res = await axiosClient.post('/Task', task);
  return res.data;
}

export async function updateTask(id: number, task: TaskDto): Promise<void> {
  await axiosClient.put(`/Task/${id}`, task);
}

export async function deleteTask(id: number): Promise<void> {
  await axiosClient.delete(`/Task/${id}`);
}

import { axiosClient } from './axiosClient';
import type { TaskDto } from '@/lib/types/dto/TaskDto';

export async function fetchTasks(): Promise<TaskDto[]> {
  const res = await axiosClient.post('/Task/filter', {});
  return res.data;
}

export async function createTask(task: TaskDto): Promise<TaskDto> {
  const res = await axiosClient.post('/Task', task);
  return res.data;
}

export async function updateTask(task: TaskDto): Promise<void> {
  await axiosClient.put(`/Task/${task.id}`, task);
}

export async function deleteTask(id: number): Promise<void> {
  await axiosClient.delete(`/Task/${id}`);
}

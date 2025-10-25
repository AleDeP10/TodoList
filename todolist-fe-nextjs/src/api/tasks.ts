import { axiosClient } from "./axiosClient";
import type { TaskDto } from "@/lib/types/dto/TaskDto";

export async function fetchTasks(): Promise<TaskDto[]> {
  const res = await axiosClient.post("/task/filter", {});
  return res.data;
}

export async function createTask(task: TaskDto): Promise<TaskDto> {
  const res = await axiosClient.post("/task", { ...task, assignee: null });
  return res.data;
}

export async function updateTask(task: TaskDto): Promise<void> {
  await axiosClient.put(`/task/${task.id}`, { ...task, assignee: null });
}

export async function deleteTask(id: number): Promise<void> {
  await axiosClient.delete(`/task/${id}`);
}

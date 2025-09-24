import { TaskStatus } from "../Status";

export interface TaskDto {
  id?: number;
  description: string;
  status: TaskStatus;
  assigneeId?: number;
}

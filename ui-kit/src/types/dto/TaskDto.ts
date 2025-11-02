import { TaskStatus } from "../Status";
import { UserDto } from "./UserDto";

export interface TaskDto {
  id?: number;
  description: string;
  status: TaskStatus;
  assigneeId?: number;
  assignee: UserDto | null;
}

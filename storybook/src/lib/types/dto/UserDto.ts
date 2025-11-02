import Entity from "../Entity";
import { UserStatus } from "../Status";
import { TaskDto } from "./TaskDto";

export interface UserDto extends Entity {
  id?: number;
  fullName: string;
  username: string;
  password: string;
  isAdmin: boolean;
  status: UserStatus;
  tasks: TaskDto[];
}

import Entity from "../Entity";
import { UserStatus } from "../Status";

export interface UserDto extends Entity {
  id?: number;
  username: string;
  password: string;
  isAdmin: boolean;
  fullName: string;
  status: UserStatus;
}

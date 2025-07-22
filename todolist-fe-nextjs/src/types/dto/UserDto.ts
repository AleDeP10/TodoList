export interface UserDto {
  id?: number;
  username: string;
  password: string;
  fullName: string;
  status: string;
  isAdmin?: boolean;
}

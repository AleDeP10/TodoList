export interface UserFilterDto {
  username?: string;
  fullName?: string;
  status?: string[]; // es: ["ACTIVE", "DELETED"]
}

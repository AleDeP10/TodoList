export interface UserFilterDto {
  username?: string;
  fullName?: string;
  status?: string[]; // ie: ["ACTIVE", "BLOCKED"]
}

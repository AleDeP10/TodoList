export interface TaskFilterDto {
  description?: string;
  status?: string[];       // es: ["TODO", "IN PROGRESS"]
  assigneeId?: number;
}
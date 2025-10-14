import { Filters } from '../Filters';
import type { TaskStatus, UserStatus } from '../../types/Status';

export type UnassignedPolicy = "TO_TOP" | "HIDE" | "TO_BOTTOM";

export interface DashboardFilters extends Filters {
  username: string;
  fullName: string;
  userStatus: Record<UserStatus, boolean>;
  description: string;
  taskStatus: Record<TaskStatus, boolean>;
  unassignedPolicy: UnassignedPolicy;
};

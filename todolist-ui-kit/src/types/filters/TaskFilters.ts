import { Filters } from '../Filters';
import type { TaskStatus } from '@/types/Status';

export interface TaskFilters extends Filters {
  description: string;
  statusMap: Record<TaskStatus, boolean>;
  assigneeId: number | undefined;
};

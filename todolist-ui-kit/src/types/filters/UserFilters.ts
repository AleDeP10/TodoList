import { Filters } from '../Filters';
import type { UserStatus } from '../../types/Status';

export interface UserFilters extends Filters {
  username: string;
  fullName: string;
  statusMap: Record<UserStatus, boolean>;
};

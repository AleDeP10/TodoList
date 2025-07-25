import type { UserStatus } from '@/types/Status';

export interface UserFilters {
  username: string;
  fullName: string;
  statusMap: Record<UserStatus, boolean>;
}
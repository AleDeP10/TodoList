import { createSelector } from '@reduxjs/toolkit';
import { UserFilters } from '@/lib/types/filters/UserFilters';
import { RootState } from '@/store/store';

export const getUserFilters = createSelector(
  [(state: RootState) => state.users.filters],
  (filters): UserFilters => filters
);
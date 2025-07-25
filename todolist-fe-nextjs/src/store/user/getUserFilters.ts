import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { UserFilters } from '@/types/filters/UserFilters';

export const getUserFilters = createSelector(
  [(state: RootState) => state.users.filters],
  (filters): UserFilters => filters
);
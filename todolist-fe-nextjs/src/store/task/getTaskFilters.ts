import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { TaskFilters } from '@/types/filters/TaskFilters';

export const getTaskFilters = createSelector(
  [(state: RootState) => state.tasks.filters],
  (filters): TaskFilters => filters
);
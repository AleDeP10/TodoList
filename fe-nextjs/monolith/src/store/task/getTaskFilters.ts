import { createSelector } from "@reduxjs/toolkit";
import { TaskFilters } from "@/lib/types/filters/TaskFilters";
import { RootState } from "@/store/store";

export const getTaskFilters = createSelector(
  [(state: RootState) => state.tasks.filters],
  (filters): TaskFilters => ({ ...filters })
);

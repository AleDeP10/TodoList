import { createSelector } from "@reduxjs/toolkit";
import { DashboardFilters } from "@/lib/types/filters/DashboardFilters";
import { RootState } from "@/store/store";

export const getDashboardFilters = createSelector(
  [(state: RootState) => state.dashboard.filters],
  (filters): DashboardFilters => ({ ...filters })
);

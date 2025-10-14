import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardFilters } from "@/lib/types/filters/DashboardFilters";

const loadStoredFilters = () => {
  const value = localStorage.getItem("dashboardFilters");
  if (value) {
    return JSON.parse(value as string) as DashboardFilters;
  }
  return {
    filters: {
      unassignedPolicy: "TO_TOP",
      username: "",
      fullName: "",
      userStatus: {
        ACTIVE: true,
        BLOCKED: true,
      },
      description: "",
      taskStatus: {
        TODO: true,
        "IN PROGRESS": true,
        PAUSED: true,
        DONE: false,
      },
    } as DashboardFilters,
  };
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: loadStoredFilters(),
  reducers: {
    setDashboardFilters(state, action: PayloadAction<DashboardFilters>) {
      localStorage.setItem(
        "dashboardFilters",
        JSON.stringify({ filters: action.payload })
      );
      state.filters = action.payload;
    },
  },
});

export const { setDashboardFilters } = dashboardSlice.actions;

export default dashboardSlice.reducer;

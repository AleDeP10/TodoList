import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DashboardFilters,
  UnassignedPolicy,
} from "@/lib/types/filters/DashboardFilters";

// ✅ Default filters used during SSR or when no localStorage is available
const initialState = {
  filters: {
    unassignedPolicy: "TO_TOP" as UnassignedPolicy,
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
      DONE: true,
    },
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardFilters(state, action: PayloadAction<DashboardFilters>) {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "dashboardFilters",
          JSON.stringify({ filters: action.payload })
        );
      }
      state.filters = action.payload;
    },
  },
});

export const { setDashboardFilters } = dashboardSlice.actions;

export default dashboardSlice.reducer;

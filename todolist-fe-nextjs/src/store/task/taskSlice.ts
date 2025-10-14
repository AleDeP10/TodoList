import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskFilters } from "@/lib/types/filters/TaskFilters";

const loadStoredFilters = () => {
  if (localStorage.getItem("taskFilters")) {
    const parsed = JSON.parse(
      localStorage.getItem("taskFilters") as string
    ) as TaskFilters;
    return parsed;
  }
  return {
    filters: {
      description: "",
      assigneeId: -1,
      statusMap: {
        TODO: true,
        "IN PROGRESS": true,
        PAUSED: true,
        DONE: false,
      },
    } as TaskFilters,
  };
};

const taskSlice = createSlice({
  name: "task",
  initialState: loadStoredFilters(),
  reducers: {
    setTaskFilters(state, action: PayloadAction<TaskFilters>) {
      localStorage.setItem(
        "taskFilters",
        JSON.stringify({ filters: action.payload })
      );
      state.filters = action.payload;
    },
  },
});

export const { setTaskFilters } = taskSlice.actions;

export default taskSlice.reducer;

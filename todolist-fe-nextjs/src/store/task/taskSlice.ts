import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskFilters } from "@/types/filters/TaskFilters";

const initialState = {
  filters: {
    description: "",
    assigneeId: -1,
    statusMap: {
      TODO: true,
      "IN PROGRESS": true,
      DONE: false,
    },
  } as TaskFilters,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskFilters(state, action: PayloadAction<TaskFilters>) {
      state.filters = action.payload;
    },
  },
});

export const { setTaskFilters } = taskSlice.actions;

export default taskSlice.reducer;

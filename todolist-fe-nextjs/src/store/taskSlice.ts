import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskDto } from '@/types/dto/TaskDto';

interface TaskState {
  list: TaskDto[];
}

const initialState: TaskState = {
  list: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TaskDto[]>) {
      state.list = action.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
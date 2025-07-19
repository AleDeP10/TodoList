import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
  list: any[];
}

const initialState: TaskState = {
  list: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<any[]>) {
      state.list = action.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
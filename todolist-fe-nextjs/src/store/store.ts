import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './task/taskSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

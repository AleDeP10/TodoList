import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboard/dashboardSlice';
import taskReducer from './task/taskSlice';
import userReducer from './user/userSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    tasks: taskReducer,
    users: userReducer,
    ui: uiReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

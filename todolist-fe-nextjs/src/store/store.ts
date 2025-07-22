import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice'; // Assicurati che il path sia corretto

export const store = configureStore({
  reducer: {
    tasks: taskReducer, // qui colleghi il reducer definito
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export const getLoadedFirstTime = createSelector(
  [(state: RootState) => state.ui],
  (ui): boolean => ui.loadedFirstTime
);
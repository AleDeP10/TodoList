import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export const getLoading = createSelector(
  [(state: RootState) => state.ui],
  (ui): boolean => ui.loadingEntities
);
import type { ReactElement } from "react";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ToastPayload = {
  type: "success" | "error" | "startup" | "delete";
  message: string;
  color?: string;
  icon?: ReactElement;
};

type UIState = {
  loadingEntities: boolean;
  loadedFirstTime: boolean;
  toast: null | ToastPayload;
};

const initialState: UIState = {
  loadingEntities: false,
  loadedFirstTime: false,
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loadingEntities = action.payload;
      if (!action.payload) {
        state.loadedFirstTime = true;
      }
    },
    showToast: (state, action: PayloadAction<ToastPayload>) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const { setLoading, showToast, clearToast } = uiSlice.actions;
export const selectToast = (state: RootState) => state.ui.toast;
export default uiSlice.reducer;

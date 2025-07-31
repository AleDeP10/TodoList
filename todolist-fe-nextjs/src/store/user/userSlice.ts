import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFilters } from "@/types/filters/UserFilters";

const initialState = {
  filters: {
    username: "",
    fullName: "",
    statusMap: {
      ACTIVE: true,
      BLOCKED: false,
    },
  } as UserFilters,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFilters(state, action: PayloadAction<UserFilters>) {
      state.filters = action.payload;
    },
  },
});

export const { setUserFilters } = userSlice.actions;

export default userSlice.reducer;

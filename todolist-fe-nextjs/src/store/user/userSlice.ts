import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFilters } from "@/lib/types/filters/UserFilters";

const loadStoredFilters = () => {
  if (localStorage.getItem("userFilters")) {
    const parsed = JSON.parse(
      localStorage.getItem("userFilters") as string
    ) as UserFilters;
    return parsed;
  }
  return {
    filters: {
      username: "",
      fullName: "",
      statusMap: {
        ACTIVE: true,
        BLOCKED: false,
      },
    } as UserFilters,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: loadStoredFilters(),
  reducers: {
    setUserFilters(state, action: PayloadAction<UserFilters>) {
      localStorage.setItem(
        "userFilters",
        JSON.stringify({ filters: action.payload })
      );
      state.filters = action.payload;
    },
  },
});

export const { setUserFilters } = userSlice.actions;

export default userSlice.reducer;

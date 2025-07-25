import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStatus } from "@/types/Status";
import { UserDto } from "@/types/dto/UserDto";

interface UserFilters {
  username: string;
  fullName: string;
  statusMap: Record<UserStatus, boolean>;
}

interface UserState {
  list: UserDto[];
  filters: UserFilters;
}

const initialState: UserState = {
  list: [],
  filters: {
    username: "",
    fullName: "",
    statusMap: {
      ACTIVE: true,
      BLOCKED: false,
    },
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserDto[]>) {
      state.list = action.payload;
    },
    setUserFilters(state, action: PayloadAction<UserFilters>) {
      state.filters = action.payload;
    },
  },
});

export const { setUsers, setUserFilters } = userSlice.actions;
export default userSlice.reducer;

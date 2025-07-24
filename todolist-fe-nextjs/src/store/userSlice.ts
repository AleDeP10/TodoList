import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '@/types/dto/UserDto';

interface UserState {
  list: UserDto[];
}

const initialState: UserState = {
  list: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserDto[]>) {
      state.list = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
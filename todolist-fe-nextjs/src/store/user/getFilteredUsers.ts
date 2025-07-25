import { createSelector } from '@reduxjs/toolkit';
import { UserDto } from '@/types/dto/UserDto';
import { RootState } from '@/store/store';

export const getFilteredUsers = createSelector(
  [(state: RootState) => state.users.list, (state: RootState) => state.users.filters],
  (users, filters) => {
    return users.filter((user: UserDto) => {
      const matchesUsername = user.username.toLowerCase().includes(filters.username.toLowerCase());
      const matchesFullName = user.fullName?.toLowerCase().includes(filters.fullName.toLowerCase()) ?? true;
      const matchesStatus = filters.statusMap[user.status];
      return matchesUsername && matchesFullName && matchesStatus;
    });
  }
);
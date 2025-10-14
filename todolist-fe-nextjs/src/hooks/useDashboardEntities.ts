/**
 * useDashboardEntities.ts
 *
 * 🧭 Context:
 * This hook provides filtered and enriched data for the dashboard view, combining user and task entities based on active filters.
 * It is designed to support visual rendering of assignments, statuses, and unassigned task policies.
 *
 * ✅ Solves:
 * - Centralized filtering logic for dashboard entities
 * - Consistent enrichment of tasks with assignee references
 * - Dynamic ordering of unassigned tasks based on user-defined policy
 *
 * ⚙️ Behavior:
 * - Retrieves filters from Redux via `getDashboardFilters`
 * - Fetches enriched users and tasks via dedicated hooks
 * - Applies filtering and sorting based on full name, username, status, and task assignment
 * - Supports three unassigned task policies: TO_TOP, TO_BOTTOM, HIDE
 *
 * 📦 Usage:
 * ```tsx
 * const { users, tasks } = useDashboardEntities();
 * ```
 */

import { useSelector } from "react-redux";
import { getDashboardFilters } from "@/store/dashboard/getDashboardFilters";
import { useEnrichedUsers } from "@/hooks/useUsers";
import { useEnrichedTasks } from "@/hooks/useTasks";
import { TaskDto } from "@/lib/types/dto/TaskDto";
import { UserDto } from "@/lib/types/dto/UserDto";

// Hook that returns filtered and enriched dashboard entities (users and tasks)
export const useDashboardEntities = () => {
  // Get current filter settings from Redux store
  const filters = useSelector(getDashboardFilters);

  // Fetch enriched user and task data (with default empty arrays)
  const { data: users = [] } = useEnrichedUsers();
  const { data: tasks = [] } = useEnrichedTasks();

  // Filter users based on full name, username, and status
  const filteredUsers: UserDto[] = users
    .filter((user) => {
      const fullNameMatch = user.fullName
        .toLowerCase()
        .includes(filters.fullName.toLowerCase());

      const usernameMatch = user.username
        .toLowerCase()
        .includes(filters.username.toLowerCase());

      const statusMatch = filters.userStatus[user.status];

      return fullNameMatch && usernameMatch && statusMatch;
    })
    // Sort users by ID in ascending order
    .sort((a: UserDto, b: UserDto) => (a.id as number) - (b.id as number));

  // Track task IDs that are already assigned to filtered users
  const assignedTaskIds = new Set<number>();

  // Collect tasks assigned to filtered users and matching task status
  const filteredTasksByUser: TaskDto[] = [];

  filteredUsers.forEach((user) => {
    user.tasks.forEach((task) => {
      if (filters.taskStatus[task.status]) {
        // Add enriched task with assignee reference
        filteredTasksByUser.push({ ...task, assignee: user });
        assignedTaskIds.add(task.id as number);
      }
    });
  });

  // Collect unassigned tasks that match the selected statuses
  const unassignedTasks: TaskDto[] = tasks
    .filter(
      (task) =>
        !task.assigneeId &&
        filters.taskStatus[task.status] &&
        !assignedTaskIds.has(task.id as number)
    )
    // Add null assignee to match enriched structure
    .map((task) => ({ ...task, assignee: null }));

  // Final list of tasks to be returned, ordered based on unassigned policy
  let finalTasks: TaskDto[] = [];

  switch (filters.unassignedPolicy) {
    case "TO_TOP":
      // Show unassigned tasks before assigned ones
      finalTasks = [...unassignedTasks, ...filteredTasksByUser];
      break;
    case "TO_BOTTOM":
      // Show unassigned tasks after assigned ones
      finalTasks = [...filteredTasksByUser, ...unassignedTasks];
      break;
    case "HIDE":
      // Hide unassigned tasks completely
      finalTasks = [...filteredTasksByUser];
      break;
  }

  // Return filtered users and ordered tasks
  return {
    users: filteredUsers,
    tasks: finalTasks
  };
};

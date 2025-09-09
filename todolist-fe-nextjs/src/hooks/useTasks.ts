import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskDto } from "@/lib/types/dto/TaskDto";
import { TaskFilters } from "@/lib/types/filters/TaskFilters";
import { useT } from "@/lib/hooks/useTranslation";
import { getTaskFilters } from "@/store/task/getTaskFilters";
import { setLoading, showToast } from "@/store/ui/uiSlice";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/api/tasks";
import {
  useEntities,
  useSaveEntity,
  useDeleteEntity,
  useFilteredEntities,
} from "@/hooks/useEntities";

/**
 * Applies task filters for description, assignee and status.
 */
const evalFilter = (task: TaskDto, filters: TaskFilters) => {
  const descriptionMatch = task.description
    .toLowerCase()
    .includes(filters.description.toLowerCase());

  const assigneeIdMatch =
    filters.assigneeId === -1
      ? true
      : filters.assigneeId === undefined
      ? !task.assigneeId
      : task.assigneeId === filters.assigneeId;

  let statusMatch = true;
  if (
    !Object.values(filters.statusMap).every((v) => v === false) &&
    !Object.values(filters.statusMap).every((v) => v === true)
  ) {
    statusMatch = filters.statusMap[task.status];
  }

  return descriptionMatch && assigneeIdMatch && statusMatch;
};

/**
 * Hook to fetch all tasks with loading and error handling.
 */
export const useTasks = () =>
  useEntities<TaskDto>("task", fetchTasks, ["tasks"]);

/**
 * Hook to fetch and filter tasks based on current Redux filters.
 */
export const useFilteredTasks = () => {
  const filters = useSelector(getTaskFilters);
  return useFilteredEntities<TaskDto, TaskFilters>(
    useTasks,
    filters,
    evalFilter
  );
};

/**
 * Hook to save a task (create or update) with feedback and cache invalidation.
 */
export const useSaveTask = () =>
  useSaveEntity<TaskDto>("task", createTask, updateTask, ["tasks"]);

/**
 * Hook to delete a task with feedback and cache invalidation.
 */
export const useDeleteTask = () =>
  useDeleteEntity("task", deleteTask, ["tasks"]);

/**
 * Hook to advance a task to its next status with feedback and cache update.
 */
export const useNextStatus = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const t = useT();

  const nextStatus = (task: TaskDto) => {
    return task.status === "TODO"
      ? "IN PROGRESS"
      : task.status === "IN PROGRESS"
      ? "DONE"
      : task.status;
  };

  return useMutation<void, Error, TaskDto>({
    mutationFn: async (task) => {
      dispatch(setLoading(true));
      const updatedTask: TaskDto = { ...task, status: nextStatus(task) };
      await updateTask(updatedTask);
    },

    onSuccess: (_data, variables) => {
      const newStatus = nextStatus(variables as TaskDto);
      dispatch(setLoading(false));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      dispatch(
        showToast({
          type: "success",
          message: t("task.nextStatus.success", {
            status: newStatus,
          }),
        })
      );
    },

    onError: (error) => {
      dispatch(setLoading(false));
      dispatch(
        showToast({
          type: "error",
          message: t("entity.save.error", {
            entity: t("entity.task"),
            message: error.message,
          }),
        })
      );
      console.error("Error while moving the task to the next status", error);
    },
  });
};

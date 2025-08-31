import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskDto } from "@/lib/types/dto/TaskDto";
import { TaskFilters } from "@/lib/types/filters/TaskFilters";
import { useT } from "@/lib/hooks/useTranslation";
import { getTaskFilters } from "@/store/task/getTaskFilters";
import { setLoading, showToast } from "@/store/ui/uiSlice";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/api/tasks";
import {
  useEntities,
  useSaveEntity,
  useDeleteEntity,
  useFilteredEntities,
} from "@/hooks/useEntities";

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
  const statusMatch = filters.statusMap[task.status];
  return descriptionMatch && assigneeIdMatch && statusMatch;
};

export const useTasks = () => useEntities<TaskDto>("Task", fetchTasks);

export const useFilteredTasks = () => {
  const filters = useSelector(getTaskFilters);
  return useFilteredEntities<TaskDto, TaskFilters>(
    useTasks,
    filters,
    evalFilter
  );
};

export const useSaveTask = () =>
  useSaveEntity<TaskDto>("Task", createTask, updateTask);

export const useDeleteTask = () => useDeleteEntity("Task", deleteTask);

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
      dispatch(setLoading(true)); // 🚦 Spinner ON

      const updatedTask: TaskDto = { ...task, status: nextStatus(task) };
      await updateTask(updatedTask); // 🔄 Update
    },

    onSuccess: (_data, variables) => {
      const newStatus = nextStatus(variables as TaskDto);

      dispatch(setLoading(false)); // 🚦 Spinner OFF
      queryClient.invalidateQueries({ queryKey: ["Task"] });

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
            entity: t("entity.Task"),
            message: error.message,
          }),
        })
      );
      console.error("Error while moving the task to the next status", error);
    },
  });
};

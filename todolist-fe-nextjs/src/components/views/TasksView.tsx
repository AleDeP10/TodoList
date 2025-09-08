"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskDto } from "@/lib/types/dto/TaskDto";
import { UserDto } from "@/lib/types/dto/UserDto";
import { TaskFilters } from "@/lib/types/filters/TaskFilters";
import { useT } from "@/lib/hooks/useTranslation";
import { Icons } from "@/lib/components/Icons";
import { Button } from "@/lib/components/ui/Button";
import LoadingSpinner from "@/lib/components/ui/LoadingSpinner";
import {
  useSaveTask,
  useDeleteTask,
  useFilteredTasks,
  useNextStatus,
} from "@/hooks/useTasks";
import { useUserList } from "@/hooks/useUsers";
import { getLoading } from "@/store/ui/getLoading";
import { setTaskFilters } from "@/store/task/taskSlice";
import { getTaskFilters } from "@/store/task/getTaskFilters";
import { getCSSVariable } from "@/lib/utils/getCSSVariable";
import TaskModal from "@/components/modals/TaskModal";
import TaskFilterModal from "@/components/modals/TaskFilterModal";
import TaskDeleteConfirmModal from "@/components/modals/TaskDeleteConfirmModal";

export default function TasksView() {
  const t = useT();
  const dispatch = useDispatch();

  const { data: filteredTasks = [] } = useFilteredTasks();
  const { mutate: saveTask } = useSaveTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: nextStatus } = useNextStatus();

  const isLoading = useSelector(getLoading);
  const taskFilters = useSelector(getTaskFilters);
  const [tmpFilters, setTmpFilters] = useState<TaskFilters>(taskFilters);
  const [currentTask, setCurrentTask] = useState<TaskDto>();
  const [taskToDelete, setTaskToDelete] = useState<TaskDto>();
  const [showFilterModal, setShowFilterModal] = useState(false);

  const users = useUserList().users;

  const clearFilters = () => {
    dispatch(
      setTaskFilters({
        description: "",
        assigneeId: -1,
        statusMap: { TODO: true, "IN PROGRESS": true, DONE: false },
      })
    );
  };

  const statusClass = {
    TODO: "task--todo",
    "IN PROGRESS": "task--in-progress ",
    DONE: "task--done",
  };

  if (process.env.NODE_ENV !== "production") {
    filteredTasks.map((task) => {
      console.log("TasksView", {
        status: task.status,
        assigneeId: task.assigneeId,
        disabled: task.status === "DONE" || !task.assigneeId,
      });
    });
  }

  return (
    <section className="p-6 space-y-6 mx-auto">
      <h2 className="text-xl font-semibold text-center">
        {t("task.management")}
      </h2>

      {/* 👤 Create & Filter buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <Button
          variant="primary"
          label={t("button.create")}
          icon={Icons.plus}
          size="small"
          backgroundColor={getCSSVariable("--create-bg")}
          onClick={() =>
            setCurrentTask({
              description: "",
              assigneeId: undefined,
              status: "DONE",
            })
          }
        />
        <div className="flex gap-2">
          <Button
            variant="primary"
            label={t("button.filter")}
            icon={Icons.filter}
            size="small"
            backgroundColor={getCSSVariable("--filter-bg")}
            onClick={() => setShowFilterModal(true)}
          />
          <Button
            variant="primary"
            label={t("button.filter.remove")}
            icon={Icons.removeFilter}
            size="small"
            backgroundColor={getCSSVariable("--remove-filter-bg")}
            onClick={clearFilters}
          />
        </div>
      </div>

      {/* 📋 Task list */}
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`border ${
                statusClass[task.status]
              } p-4 rounded shadow-sm flex flex-wrap items-center justify-between gap-4 sm:items-center`}
            >
              <div className="text-sm">
                <strong>{task.description}</strong>
                <div className="text-xs text-[var(--text-secondary)]">
                  {!task.assigneeId
                    ? t("task.noAssignee")
                    : users.find((user: UserDto) => user.id === task.assigneeId)
                        ?.fullName}{" "}
                  • {task.status}
                </div>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0 ml-auto">
                <Button
                  tooltip={t("button.edit")}
                  icon={Icons.edit}
                  size="small"
                  variant="primary"
                  onClick={() => setCurrentTask(task)}
                />
                <Button
                  tooltip={
                    task.status === "DONE" || !task.assigneeId
                      ? t("task.nextStatus.disabled")
                      : t("task.nextStatus")
                  }
                  icon={Icons.arrowRight}
                  size="small"
                  variant="primary"
                  disabled={task.status === "DONE" || !task.assigneeId}
                  onClick={() => nextStatus(task)}
                />
                <Button
                  tooltip={t("button.delete")}
                  icon={Icons.delete}
                  size="small"
                  variant="danger"
                  onClick={() => setTaskToDelete(task)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 🔍 Filter modal */}
      {showFilterModal && (
        <TaskFilterModal
          filters={tmpFilters}
          onChange={setTmpFilters}
          originalFilters={taskFilters}
          onClose={() => setShowFilterModal(false)}
          onApply={() => {
            dispatch(setTaskFilters(tmpFilters));
            setShowFilterModal(false);
          }}
        />
      )}

      {/* ✏️ Create/Edit modal */}
      {currentTask && (
        <TaskModal
          currentTask={currentTask}
          onClose={() => setCurrentTask(undefined)}
          onSubmit={(task) => {
            saveTask({ entity: task });
            setCurrentTask(undefined);
          }}
        />
      )}

      {/* ❌ Delete modal */}
      {taskToDelete && (
        <TaskDeleteConfirmModal
          task={taskToDelete}
          onClose={() => setTaskToDelete(undefined)}
          onConfirm={() => {
            deleteTask(taskToDelete.id as number);
            setTaskToDelete(undefined);
          }}
        />
      )}
    </section>
  );
}

"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { TaskDto } from "@/lib/types/dto/TaskDto";
import { UserDto } from "@/lib/types/dto/UserDto";
import { DashboardFilters } from "@/lib/types/filters/DashboardFilters";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useResponsiveVisibility } from "@/lib/hooks/useResponsiveVisibility";
import { getCSSVariable, getCSSVariableAsync } from "@/lib/utils/getCSSVariable";
import { DashboardIcons, Icons } from "@/lib/components/Icons";
import { Anchor } from "@/lib/components/ui/Anchor";
import { Button } from "@/lib/components/ui/Button";
import LoadingSpinner from "@/lib/components/ui/LoadingSpinner";
import { useSaveUser } from "@/hooks/useUsers";
import { useSaveTask } from "@/hooks/useTasks";
import { useDashboardEntities } from "@/hooks/useDashboardEntities";
import { setDashboardFilters } from "@/store/dashboard/dashboardSlice";
import { getDashboardFilters } from "@/store/dashboard/getDashboardFilters";
import { getLoading } from "@/store/ui/getLoading";
import DashboardFilterModal from "@/components/modals/DashboardFilterModal";
import ManualModal from "@/components/modals/ManualModal";
import TaskModal from "@/components/modals/TaskModal";
import UserModal from "@/components/modals/UserModal";

export default function DashboardView() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const t = useTranslation();
  const { sm, md } = useResponsiveVisibility();

  const { users = [], tasks = [] } = useDashboardEntities();
  const isLoading = useSelector(getLoading);

  const { mutate: saveTask } = useSaveTask();
  const { mutate: saveUser } = useSaveUser();

  const dashboardFilters = useSelector(getDashboardFilters);
  const [tmpFilters, setTmpFilters] =
    useState<DashboardFilters>(dashboardFilters);
  const [filtersLoaded, setFiltersLoaded] = useState<boolean>(false);
  const [filterColor, setFilterColor] = useState<string>();
  const [removeFilterColor, setRemoveFilterColor] = useState<string>();
  const [currentTask, setCurrentTask] = useState<TaskDto>();
  const [currentUser, setCurrentUser] = useState<UserDto>();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  const drawAssignments = useCallback((users: UserDto[], tasks: TaskDto[]) => {
    const canvas = document.getElementById(
      "assignment-canvas"
    ) as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    // Resize canvas to match container
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    users.forEach((user) => {
      const userEl = document.querySelector(`#user-${user.id}`) as HTMLElement;

      if (!userEl) return;

      const userRect = userEl.getBoundingClientRect();
      const startX = userRect.right - rect.left;
      const startY = userRect.top + userRect.height / 2 - rect.top;

      user.tasks.forEach((task: TaskDto) => {
        const taskEl = document.querySelector(
          `#task-${task.id}`
        ) as HTMLElement;

        if (!tasks.map((task) => task.id).includes(task.id)) return;
        if (!taskEl) return;

        const taskRect = taskEl.getBoundingClientRect();
        const endX = taskRect.left - rect.left;
        const endY = taskRect.top + taskRect.height / 2 - rect.top;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = getStatusColor(task.status);
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });
  }, []);

  function getStatusColor(status: string): string {
    switch (status) {
      case "TODO":
        return getCSSVariable("--task-todo");
      case "IN PROGRESS":
        return getCSSVariable("--task-in-progress");
      case "PAUSED":
        return getCSSVariable("--task-paused");
      case "DONE":
        return getCSSVariable("--task-done");
      case "ACTIVE":
        return getCSSVariable("--user-active");
      case "BLOCKED":
        return getCSSVariable("--user-blocked");
      default:
        return "#999";
    }
  }

  useLayoutEffect(() => {
    drawAssignments(users, tasks);
  }, [drawAssignments, users, tasks]);

  const drawAssignmentsRef = useRef(() => {});

  useEffect(() => {
    drawAssignmentsRef.current = () => drawAssignments(users, tasks);
    drawAssignmentsRef.current();
  }, [drawAssignments, users, tasks]);

  const shortDescription = (description: string) => {
    const minLength = sm ? 7 : md ? 14 : 21;
    if (description.length <= minLength) {
      return description;
    }

    let i = minLength;
    let short = description.substring(0, i);
    let char = description.charAt(i);
    while (char !== " " && i < description.length) {
      char = description.charAt(i);
      short += char;
      i++;
    }
    short = short.trim() + "...";
    return short;
  };

  function debounce(fn: () => void, delay: number) {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  useEffect(() => {
    const handleResize = debounce(() => drawAssignments(users, tasks), 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawAssignments, users, tasks]);

  const clearFilters = () => {
    dispatch(
      setDashboardFilters({
        unassignedPolicy: "TO_TOP",
        username: "",
        fullName: "",
        userStatus: {
          ACTIVE: true,
          BLOCKED: true,
        },
        description: "",
        taskStatus: {
          TODO: true,
          "IN PROGRESS": true,
          PAUSED: true,
          DONE: false,
        },
      })
    );
  };

  useEffect(() => {
    if (!filtersLoaded && typeof window !== "undefined") {
      const stored = localStorage.getItem("dashboardFilters");
      if (stored) {
        const parsed = JSON.parse(stored).filters as DashboardFilters;
        dispatch(setDashboardFilters(parsed));
        setFiltersLoaded(true);
      }
    }
  }, [dispatch, filtersLoaded]);

  useEffect(() => {
    getCSSVariableAsync("--filter-bg")
      .then((color) => {
        setFilterColor(color);
      })
      .catch((err) => {
        console.warn(err.message);
      });
    getCSSVariableAsync("--remove-filter-bg")
      .then((color) => {
        setRemoveFilterColor(color);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  return (
    <div className="sm:px-2 md:px-4 lg:px-6 py-6 space-y-6 mx-auto text-center">
      <h2 className="text-xl font-semibold text-center">
        {t("dashboard.title")}
      </h2>
      <div>
        <div className="flex justify-end w-full">
          <div className="flex gap-2">
            <Button
              variant="primary"
              label={t("button.filter")}
              icon={Icons.filter}
              size="small"
              backgroundColor={filterColor}
              onClick={() => setShowFilterModal(true)}
            />
            <Button
              variant="primary"
              label={t("button.filter.remove")}
              icon={Icons.removeFilter}
              size="small"
              backgroundColor={removeFilterColor}
              onClick={clearFilters}
            />
          </div>
        </div>
        {isLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <div className="dashboard-container relative mt-4">
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
              style={{
                backgroundColor: getCSSVariable("--dashboard-bg-rgba"),
                borderRadius: "8px",
              }}
            />
            <canvas
              id="assignment-canvas"
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-3"
            />
            <div className="dashboard-content relative z-2 flex justify-center w-full">
              <div className="col-span-6 users">
                {users.map((user: UserDto) => (
                  <div
                    id={`user-${user.id}`}
                    key={`user-${user.id}`}
                    className="user-icon"
                  >
                    <div className="flex gap-2 align-center justify-end w-full">
                      <Anchor
                        onClick={() => {
                          setCurrentUser(user);
                        }}
                      >
                        {user.username}
                      </Anchor>
                      <div className="mt-1">
                        {DashboardIcons.user({
                          color: getStatusColor(user.status),
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={`${
                  sm ? "divisor-sm" : md ? "divisor-md" : "divisor-lg"
                }`}
              ></div>
              <div className="col-span-6 tasks">
                {tasks.map((task: TaskDto) => (
                  <div
                    id={`task-${task.id}`}
                    key={`task-${task.id}`}
                    className="task-icon"
                  >
                    <div className="flex flex-col align-center w-full">
                      <div className="flex gap-2">
                        <div className="mt-1">
                          {DashboardIcons.task({
                            color: getStatusColor(task.status),
                          })}
                        </div>
                        <Anchor
                          onClick={() => {
                            setCurrentTask(task);
                          }}
                        >
                          {shortDescription(task.description)}
                        </Anchor>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔍 Filter modal */}
      {showFilterModal && (
        <DashboardFilterModal
          filters={tmpFilters}
          onChange={setTmpFilters}
          originalFilters={dashboardFilters}
          onClose={() => setShowFilterModal(false)}
          onApply={() => {
            dispatch(setDashboardFilters(tmpFilters));
            setShowFilterModal(false);
          }}
        />
      )}

      {/* ✏️ Create/Edit Task modal */}
      {currentTask && (
        <TaskModal
          currentTask={currentTask}
          onClose={() => setCurrentTask(undefined)}
          onSubmit={async (task) => {
            await new Promise((resolve) => {
              saveTask({ entity: task }, { onSuccess: resolve });
            });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            setCurrentTask(undefined);
          }}
        />
      )}

      {/* ✏️ Create/Edit User modal */}
      {currentUser && (
        <UserModal
          currentUser={currentUser}
          onClose={() => setCurrentUser(undefined)}
          onSubmit={async (user) => {
            await new Promise((resolve) => {
              saveUser({ entity: user }, { onSuccess: resolve });
            });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            setCurrentUser(undefined);
          }}
        />
      )}

      {/* Manual modal */}
      {showManualModal && (
        <ManualModal onClose={() => setShowManualModal(false)} />
      )}
    </div>
  );
}

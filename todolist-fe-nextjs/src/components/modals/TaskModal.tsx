"use client";

import { useMemo, useState } from "react";
import { TaskStatus } from "@/lib/types/Status";
import { Helper } from "@/lib/types/Validation";
import { TaskDto } from "@/lib/types/dto/TaskDto";
import { UserDto } from "@/lib/types/dto/UserDto";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useFieldValidation } from "@/lib/hooks/useFieldValidation";
import { Icons } from "@/lib/components/Icons";
import { ButtonVariant } from "@/lib/components/ui/Button";
import Dropdown from "@/lib/components/ui/Dropdown";
import Modal from "@/lib/components/ui/Modal";
import TextField from "@/lib/components/ui/TextField";
import { useUserList } from "@/hooks/useUsers";

interface Props {
  currentTask?: TaskDto;
  onClose: () => void;
  onSubmit: (task: TaskDto) => void;
}

export default function TaskModal({ currentTask, onClose, onSubmit }: Props) {
  const t = useTranslation();

  const [formState, setFormState] = useState<TaskDto>({
    id: currentTask?.id,
    description: currentTask?.description ?? "",
    assigneeId: currentTask?.assigneeId ?? undefined,
    status: currentTask?.status ?? "TODO",
    assignee: currentTask?.assignee ?? null,
  });

  const noAssigneeLabel = t("task.noAssignee");

  const dummyUser = useMemo<UserDto>(
    () => ({
      id: undefined,
      fullName: noAssigneeLabel,
      username: "",
      password: "",
      isAdmin: false,
      status: "ACTIVE",
      tasks: [],
    }),
    [noAssigneeLabel]
  );

  const fetchedUsers = useUserList().users;
  const users = useMemo(
    () => [dummyUser, ...fetchedUsers],
    [dummyUser, fetchedUsers]
  );

  const selectedUser =
    users.find((u) => u.id === formState.assigneeId) ?? dummyUser;

  const evalStatusHelper = (): Helper | null => {
    const normalized = formState.status.trim().toUpperCase();
    const hasAssignee = !!formState.assigneeId;
    const isBlocked = formState.assignee?.status === "BLOCKED";

    if (process.env.NEXT_PUBLIC_ENV !== "production") {
      console.log("TaskModal.evalHelper", {
        normalized,
        assignee: formState.assignee,
        isBlocked,
        errorBlockedAssignee: normalized === "IN PROGRESS" && isBlocked,
        warningRequiresAssignee:
          ["DONE", "IN PROGRESS"].includes(normalized) && !hasAssignee,
      });
    }

    if (normalized === "IN PROGRESS" && isBlocked) {
      return { type: "error", text: t("task.status.blockedAssignee") };
    }
    if (["DONE", "IN PROGRESS"].includes(normalized) && !hasAssignee) {
      return { type: "error", text: t("task.status.requiresAssignee") };
    }
    return null;
  };

  const { isFormValid, markTouched, hasError, getHelper } = useFieldValidation(
    {
      description: formState.description,
      assignee: String(formState.assigneeId ?? ""),
      status: formState.status,
    },
    ["description"],
    {
      assignee: {
        displayRule: (assigneeId) => {
          const hasAssignee = !!assigneeId;
          const isBlocked = formState.assignee?.status === "BLOCKED";

          if (process.env.NEXT_PUBLIC_ENV !== "production") {
            console.log("assignee.displayRule", {
              assigneeId,
              assignee: formState.assignee,
              hasAssignee,
              isBlocked,
              showForInProgress: !hasAssignee || isBlocked,
              showForDone: !hasAssignee,
            });
          }

          switch (formState.status) {
            case "IN PROGRESS": {
              return !hasAssignee || isBlocked;
            }
            case "DONE": {
              return !hasAssignee;
            }
          }
          return false;
        },
        helper: { type: "error", text: "" },
      },
      status: {
        displayRule: (status) => {
          const normalized = status.trim().toUpperCase();
          const hasAssignee = !!formState.assigneeId;
          const isBlocked = formState.assignee?.status === "BLOCKED";

          if (process.env.NEXT_PUBLIC_ENV !== "production") {
            console.log("status.displayRule", {
              normalized,
              assigneeId: formState.assigneeId,
              assignee: formState.assignee,
              hasAssignee,
              isBlocked,
              showForInProgress: !hasAssignee || isBlocked,
              showForDone: !hasAssignee,
            });
          }

          switch (normalized) {
            case "IN PROGRESS":
              return !hasAssignee || isBlocked;
            case "DONE":
              return !hasAssignee;
            default:
              return false;
          }
        },
        helper: (() => {
          const helper = evalStatusHelper();
          if (process.env.NEXT_PUBLIC_ENV !== "production") {
            console.log("status.helper", { helper });
          }
          return helper;
        })(),
      },
    }
  );

  return (
    <Modal
      title={currentTask?.id ? t("task.edit.title") : t("task.create.title")}
      onClose={onClose}
      footerActions={[
        {
          label: t("button.cancel"),
          icon: Icons.cancel,
          variant: "secondary" as ButtonVariant,
          onClick: onClose,
        },
        {
          label: t("button.save"),
          icon: Icons.save,
          variant: "primary" as ButtonVariant,
          onClick: () => {
            ["description", "status"].forEach(markTouched);
            if (isFormValid) {
              onSubmit(formState);
            }
          },
          disabled: !isFormValid,
        },
      ]}
    >
      <div className="flex flex-col gap-2">
        {/* Description */}
        <TextField
          label={t("task.description")}
          value={formState.description}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          onBlur={() => markTouched("description")}
          error={hasError("description")}
          helper={getHelper("description")}
          placeholder={t("task.description.placeholder")}
        />

        {/* Assignee */}
        <Dropdown<UserDto>
          value={selectedUser}
          options={users.filter(
            (user: UserDto) =>
              user.status === "ACTIVE" || user.id === currentTask?.assigneeId
          )}
          getOptionValue={(user) => String(user.id)}
          getOptionLabel={(user) => user.fullName}
          label={t("task.assignee")}
          onChange={(user) => {
            setFormState((prev) => ({
              ...prev,
              assigneeId: user.id,
              assignee: user,
            }));
            markTouched("assignee");
          }}
          onBlur={() => markTouched("assignee")}
          error={hasError("assignee")}
        />

        {/* Status */}
        <Dropdown<TaskStatus>
          value={formState.status}
          options={["TODO", "IN PROGRESS", "PAUSED", "DONE"]}
          label={t("task.status")}
          onChange={(status) => {
            setFormState((prev) => ({
              ...prev,
              status: status!,
            }));
            markTouched("status");
          }}
          onBlur={() => markTouched("status")}
          error={hasError("status")}
          helper={getHelper("status")}
        />
      </div>
    </Modal>
  );
}

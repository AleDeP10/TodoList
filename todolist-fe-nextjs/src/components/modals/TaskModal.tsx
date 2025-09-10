"use client";

import { useMemo, useState } from "react";
import { TaskStatus } from "@/lib/types/Status";
import { TaskDto } from "@/lib/types/dto/TaskDto";
import { UserDto } from "@/lib/types/dto/UserDto";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useFieldValidation } from "@/lib/hooks/useFieldValidation";
import { Icons } from "@/lib/components/Icons";
import Modal from "@/lib/components/ui/Modal";
import { ButtonVariant } from "@/lib/components/ui/Button";
import TextField from "@/lib/components/ui/TextField";
import Dropdown from "@/lib/components/ui/Dropdown";
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

  const { isFormValid, markTouched, hasError, getHelperText } =
    useFieldValidation(
      {
        description: formState.description,
        assigneeId: String(formState.assigneeId ?? ""),
        status: formState.status,
      },
      ["description"],
      {
        status: {
          validate: (status) => {
            const normalized = status.trim().toUpperCase();
            if (normalized === "TODO") return true;
            return !!formState.assigneeId;
          },
          helperText: t("task.status.requiresAssignee"),
        },
      }
    );

  return (
    <Modal
      title={currentTask ? t("task.edit.title") : t("task.create.title")}
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
          helperText={getHelperText("description")}
          placeholder={t("task.description.placeholder")}
        />

        {/* Assignee */}
        <Dropdown<UserDto>
          value={selectedUser}
          options={users}
          getOptionValue={(user) => String(user.id)}
          getOptionLabel={(user) => user.fullName}
          label={t("task.assignee")}
          onChange={(user) => {
            setFormState((prev) => ({
              ...prev,
              assigneeId: user.id,
            }));
            markTouched("status");
          }}
          onBlur={() => markTouched("status")}
          error={hasError("status")}
        />

        {/* Status */}
        <Dropdown<TaskStatus>
          value={formState.status}
          options={["TODO", "IN PROGRESS", "DONE"]}
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
          helperText={getHelperText("status")}
        />
      </div>
    </Modal>
  );
}

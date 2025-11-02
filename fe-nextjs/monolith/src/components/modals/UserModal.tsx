"use client";

import { useState } from "react";
import { UserStatus } from "@/lib/types/Status";
import { UserDto } from "@/lib/types/dto/UserDto";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useIsUsernameUnique } from "@/hooks/useUsers";
import { useFieldValidation } from "@/lib/hooks/useFieldValidation";
import { Icons } from "@/lib/components/Icons";
import Modal from "@/lib/components/ui/Modal";
import { ButtonVariant } from "@/lib/components/ui/Button";
import TextField from "@/lib/components/ui/TextField";
import Dropdown from "@/lib/components/ui/Dropdown";
import Switch from "@/lib/components/ui/Switch";

interface Props {
  currentUser?: UserDto;
  onClose: () => void;
  onSubmit: (user: UserDto) => void;
}

export default function UserModal({ currentUser, onClose, onSubmit }: Props) {
  const t = useTranslation();

  const [formState, setFormState] = useState<UserDto>({
    id: currentUser?.id,
    fullName: currentUser?.fullName ?? "",
    username: currentUser?.username ?? "",
    password: currentUser?.password ?? "",
    isAdmin: currentUser?.isAdmin ?? false,
    status: currentUser?.status ?? "ACTIVE",
    tasks: currentUser?.tasks ?? [],
  });

  const checkUsernameUnique = useIsUsernameUnique();

  const inProgress = () => {
    return formState.tasks.filter((task) => task.status === "IN PROGRESS")
      .length;
  };

  const { isFormValid, markTouched, hasError, getHelper } = useFieldValidation(
    {
      fullName: formState.fullName,
      username: formState.username,
      password: formState.password,
      status: formState.status,
    },
    ["fullName", "username", "password"],
    {
      username: {
        displayRule: (username) =>
          username.trim() !== "" &&
          !checkUsernameUnique(username, formState.id),
        helper: { type: "error", text: t("user.username.duplicate") },
      },
      status: {
        displayRule: (status) => status === "BLOCKED" && inProgress() > 0,
        helper: {
          type: "warning",
          text: t("user.status.blocked", { inProgress: inProgress() }),
        },
      },
    }
  );

  return (
    <Modal
      title={currentUser?.id ? t("user.edit.title") : t("user.create.title")}
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
            ["fullName", "username", "password", "status"].forEach(markTouched);
            if (isFormValid) {
              onSubmit(formState);
            }
          },
          disabled: !isFormValid,
        },
      ]}
    >
      <div className="flex flex-col gap-2">
        {/* Full name */}
        <TextField
          label={t("user.fullName")}
          value={formState.fullName}
          onChange={(e) =>
            setFormState((u) => ({
              ...u,
              fullName: e.target.value,
            }))
          }
          onBlur={() => markTouched("fullName")}
          error={hasError("fullName")}
          helper={getHelper("fullName")}
          placeholder={t("user.fullName.placeholder")}
        />

        {/* Username */}
        <TextField
          label={t("user.username")}
          value={formState.username}
          onChange={(e) =>
            setFormState((u) => ({
              ...u,
              username: e.target.value,
            }))
          }
          onBlur={() => markTouched("username")}
          error={hasError("username")}
          helper={getHelper("username")}
          placeholder={t("user.username.placeholder")}
        />

        {/* Password */}
        <TextField
          variant="password"
          label={t("user.password")}
          value={formState.password}
          onChange={(e) =>
            setFormState((u) => ({
              ...u,
              password: e.target.value,
            }))
          }
          onBlur={() => markTouched("password")}
          error={hasError("password")}
          helper={getHelper("password")}
          placeholder={t("user.password.placeholder")}
        />

        {/* IsAdmin */}
        <Switch
          variant="grid"
          label={t("user.isAdmin")}
          checked={formState.isAdmin}
          onChange={(checked) =>
            setFormState((u: UserDto) => ({
              ...u,
              isAdmin: checked,
            }))
          }
        />

        {/* Status */}
        <Dropdown<UserStatus>
          label={t("user.status")}
          onChange={(selectedValue) => {
            setFormState((u: UserDto) => ({
              ...u,
              status: selectedValue!,
            }));
            markTouched("status");
          }}
          onBlur={() => markTouched("status")}
          value={formState.status}
          options={["ACTIVE", "BLOCKED"]}
          error={hasError("status")}
          helper={getHelper("status")}
        />
      </div>
    </Modal>
  );
}

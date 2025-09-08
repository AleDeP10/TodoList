"use client";

import { useState } from "react";
import { UserDto } from "@/lib/types/dto/UserDto";
import { UserStatus } from "@/lib/types/Status";
import { useT } from "@/lib/hooks/useTranslation";
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
  const t = useT();

  const [formState, setFormState] = useState<UserDto>({
    id: currentUser?.id,
    fullName: currentUser?.fullName ?? "",
    username: currentUser?.username ?? "",
    password: currentUser?.password ?? "",
    isAdmin: currentUser?.isAdmin ?? false,
    status: currentUser?.status ?? "ACTIVE",
  });

  const checkUsernameUnique = useIsUsernameUnique();

  const { isFormValid, markTouched, hasError, getHelperText } =
    useFieldValidation(
      {
        fullName: formState.fullName,
        username: formState.username,
        password: formState.password,
      },
      ["fullName", "username", "password"],
      {
        username: {
          validate: (val) =>
            val.trim() !== "" && checkUsernameUnique(val, formState.id),
          helperText: t("user.username.duplicate"),
        },
      }
    );

  if (process.env.NODE_ENV !== "production") {
    console.log("UserModal footerActions", {
      isFormValid,
      disabled: !isFormValid,
      formState,
    });
  }

  return (
    <Modal
      title={currentUser ? t("user.edit.title") : t("user.create.title")}
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
            ["fullName", "username", "password"].forEach(markTouched);
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
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("user.fullName")}
          </label>
          <div className="col-span-9">
            <TextField
              value={formState.fullName}
              onChange={(e) =>
                setFormState((u) => ({
                  ...u,
                  fullName: e.target.value,
                }))
              }
              onBlur={() => markTouched("fullName")}
              error={hasError("fullName")}
              helperText={getHelperText("fullName")}
              placeholder={t("user.fullName.placeholder")}
            />
          </div>
        </div>

        {/* Username */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("user.username")}
          </label>
          <div className="col-span-9">
            <TextField
              value={formState.username}
              onChange={(e) =>
                setFormState((u) => ({
                  ...u,
                  username: e.target.value,
                }))
              }
              onBlur={() => markTouched("username")}
              error={hasError("username")}
              helperText={getHelperText("username")}
              placeholder={t("user.username.placeholder")}
            />
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("user.password")}
          </label>
          <div className="col-span-9">
            <TextField
              value={formState.password}
              onChange={(e) => {
                if (process.env.NODE_ENV !== "production") {
                  console.log("UserModal", {
                    formState,
                    password: e.target.value,
                  });
                }
                setFormState((u) => ({
                  ...u,
                  password: e.target.value,
                }));
              }}
              onBlur={() => markTouched("password")}
              error={hasError("password")}
              helperText={getHelperText("password")}
              placeholder={t("user.password.placeholder")}
            />
          </div>
        </div>

        {/* IsAdmin */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("user.isAdmin")}
          </label>
          <div className="col-span-9">
            <Switch
              checked={formState.isAdmin}
              onChange={(checked) =>
                setFormState((u: UserDto) => ({
                  ...u,
                  isAdmin: checked,
                }))
              }
            />
          </div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("user.status")}
          </label>
          <div className="col-span-9">
            <Dropdown<UserStatus>
              onChange={(selectedValue) =>
                setFormState((u: UserDto) => ({
                  ...u,
                  status: selectedValue!,
                }))
              }
              value={formState.status}
              options={["ACTIVE", "BLOCKED"]}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

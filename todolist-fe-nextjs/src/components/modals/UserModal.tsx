import { useState } from "react";
import { useT } from "@/hooks/useTranslation";
import { Icons } from "@/lib/icons/Icons";
import { UserDto } from "@/types/dto/UserDto";
import { UserStatus } from "@/types/Status";
import Modal from "@/components/ui/Modal";
import { ButtonVariant } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Dropdown from "@/components/ui/Dropdown";
import Switch from "@/components/ui/Switch";

interface Props {
  currentUser?: UserDto;
  onClose: () => void;
  onSubmit: (user: UserDto) => void;
}

export default function UserEditModal({
  currentUser,
  onClose,
  onSubmit,
}: Props) {
  const [formState, setFormState] = useState<UserDto>({
    id: currentUser?.id,
    fullName: currentUser?.fullName ?? "",
    username: currentUser?.username ?? "",
    password: currentUser?.password ?? "",
    isAdmin: currentUser?.isAdmin ?? false,
    status: currentUser?.status ?? "ACTIVE",
  });
  const t = useT();

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
          onClick: () => onSubmit(formState),
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
                setFormState((u: UserDto) => ({
                  ...u,
                  fullName: e.target.value,
                }))
              }
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
                setFormState((u: UserDto) => ({
                  ...u,
                  username: e.target.value,
                }))
              }
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
              onChange={(e) =>
                setFormState((u: UserDto) => ({
                  ...u,
                  password: e.target.value,
                }))
              }
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
                setFormState((u) => ({
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

'use client';

import Modal from "@/components/ui/Modal";
import { Icons } from "@/lib/icons/Icons";
import { UserDto } from "@/types/dto/UserDto";
import { ButtonVariant } from "@/components/ui/Button";
import { useT } from "@/hooks/useTranslation";

interface Props {
  user: UserDto;
  onClose: () => void;
  onConfirm: () => void;
}

export default function UserDeleteConfirmModal({ user, onClose, onConfirm }: Props) {
  const t = useT();

  return (
    <Modal
      title={t("user.delete.confirmTitle")}
      onClose={onClose}
      footerActions={[
        {
          icon: Icons.cancel,
          label: t("button.cancel"),
          variant: "secondary" as ButtonVariant,
          onClick: onClose,
        },
        {
          icon: Icons.confirm,
          label: t("button.confirm"),
          variant: "danger" as ButtonVariant,
          onClick: onConfirm,
        },
      ]}
    >
      <div className="space-y-3 text-sm">
        <p>
          {t("user.delete.confirmBody", {
            name: user.fullName ?? user.username,
          })}
        </p>
        <p className="text-xs text-gray-600">
          {t("user.delete.noteSetNull")}
        </p>
      </div>
    </Modal>
  );
}
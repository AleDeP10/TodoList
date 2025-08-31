'use client';

import Modal from "@/lib/components/ui/Modal";
import { Icons } from "@/lib/components/Icons";
import { UserDto } from "@/lib/types/dto/UserDto";
import { useT } from "@/lib/hooks/useTranslation";
import { ButtonVariant } from "@/lib/components/ui/Button";

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
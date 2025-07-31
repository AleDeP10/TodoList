'use client';

import Modal from "@/components/ui/Modal";
import { Icons } from "@/lib/icons/Icons";
import { TaskDto } from "@/types/dto/TaskDto";
import { ButtonVariant } from "@/components/ui/Button";
import { useT } from "@/hooks/useTranslation";

interface Props {
  task: TaskDto;
  onClose: () => void;
  onConfirm: () => void;
}

export default function TaskDeleteConfirmModal({ task, onClose, onConfirm }: Props) {
  const t = useT();

  return (
    <Modal
      title={t("task.delete.confirmTitle")}
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
          {t("task.delete.confirmBody", {
            name: task.description,
          })}
        </p>
        <p className="text-xs text-gray-600">
          {t("task.delete.noteSetNull")}
        </p>
      </div>
    </Modal>
  );
}
'use client';

import Modal from "@/lib/components/ui/Modal";
import { Icons } from "@/lib/components/Icons";
import { TaskDto } from "@/lib/types/dto/TaskDto";
import { ButtonVariant } from "@/lib/components/ui/Button";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface Props {
  task: TaskDto;
  onClose: () => void;
  onConfirm: () => void;
}

export default function TaskDeleteConfirmModal({ task, onClose, onConfirm }: Props) {
  const t = useTranslation();

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
            description: task.description,
          })}
        </p>
      </div>
    </Modal>
  );
}
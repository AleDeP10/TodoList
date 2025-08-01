"use client";

import { useT } from "@/hooks/useTranslation";
import { Icons } from "@/lib/icons/Icons";
import Modal from "@/components/ui/Modal";
import { ButtonVariant } from "@/components/ui/Button";

interface AboutAuthorModalProps {
  onClose: () => void;
}

export default function AboutAuthorModal({ onClose }: AboutAuthorModalProps) {
  const t = useT();

  return (
    <Modal
      title={t("author.title")}
      onClose={onClose}
      footerActions={[
        {
          icon: Icons.cancel,
          label: t("button.cancel"),
          variant: "secondary" as ButtonVariant,
          onClick: onClose,
        },
      ]}
    >
      <div className="space-y-4 text-sm">
        <p>{t("author.line1")}</p>
        <p>{t("author.line2")}</p>
        <p>{t("author.line3")}</p>
      </div>
    </Modal>
  );
}

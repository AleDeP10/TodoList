"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { Icons } from "@/lib/components/Icons";
import Modal from "@/lib/components/ui/Modal";
import { ButtonVariant } from "@/lib/components/ui/Button";
import { renderHeaders, renderList } from "@/utils/styledI18n";

interface AboutAuthorModalProps {
  onClose: () => void;
}

export default function ManualModal({ onClose }: AboutAuthorModalProps) {
  const t = useTranslation();
  const sections = [
    "manual.model",
    "manual.navbar",
    "manual.dashboard",
    "manual.management",
  ];

  return (
    <Modal
      title={t("manual.title")}
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
      <div className="text-left">
        {renderHeaders("manual", t)}
        {sections.map((prefix) => renderList(prefix, /\b(TODO|IN PROGRESS|PAUSED|DONE|ACTIVE|BLOCKED)\b/g, t))}
      </div>
    </Modal>
  );
}

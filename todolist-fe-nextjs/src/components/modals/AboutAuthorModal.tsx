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
      title="About • Alessandro De Prato"
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
        <h3 className="font-semibold text-base">Profile</h3>
        <p>
          Sviluppatore full-stack con attenzione alla UI moderna, architetture
          modulari e TypeScript evoluto.
        </p>
      </div>
    </Modal>
  );
}

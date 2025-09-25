"use client";

import React, { ReactNode, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Button, ButtonVariant } from "./Button";
import IconButton from "./IconButton";
import { Icons } from "../Icons";

export interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  closeHandlers?: Record<string, () => void>;
  footerActions?: {
    label: string;
    icon?: ReactNode;
    variant?: ButtonVariant;
    disabled?: boolean;
    onClick: () => void;
  }[];
  disableAnimation?: boolean;
}

export default function Modal({
  title,
  children,
  onClose,
  footerActions = [],
  disableAnimation = false,
}: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [onClose]);

  const modalContent = (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center px-4 py-6 overflow-y-auto scroll-py-6"
    >
      <div className="bg-[var(--modal-bg)] text-[var(--fg)] rounded-lg shadow-lg w-full max-w-lg overflow-y-auto">
        {/* 🔘 Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--fg)]">
          <h2 className="text-lg font-semibold w-full text-center whitespace-normal">{title}</h2>
          <IconButton icon={Icons.close} onClick={onClose} />
        </div>

        {/* 📄 Content */}
        <div className="p-6 whitespace-normal">{children}</div>

        {/* 🧼 Footer */}
        {footerActions.length > 0 && (
          <div className="flex justify-center gap-2 px-6 py-4 border-t border-[var(--fg)]">
            {footerActions.map(
              ({ icon, label, variant, disabled, onClick }) => (
                <Button
                  key={label}
                  label={label}
                  icon={icon}
                  size="small"
                  variant={variant}
                  disabled={disabled}
                  onClick={onClick}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );

  return disableAnimation ? (
    modalContent
  ) : (
    <AnimatePresence>{modalContent}</AnimatePresence>
  );
}

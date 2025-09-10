"use client";

import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
}

export default function Modal({
  title,
  children,
  onClose,
  footerActions = [],
}: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center px-4 py-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-[var(--modal-bg)] text-[var(--fg)] rounded-lg shadow-lg w-full max-w-lg"
        >
          {/* 🔘 Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--fg)]">
            <h2 className="text-lg font-semibold w-full text-center">
              {title}
            </h2>
            <IconButton icon={Icons.close} onClick={onClose}></IconButton>
          </div>

          {/* 📄 Content */}
          <div className="p-6">{children}</div>

          {/* 🧼 Footer */}
          {footerActions.length > 0 && (
            <div className="flex justify-center gap-2 px-6 py-4 border-t border-[var(--fg)]">
              {footerActions.map(
                ({ icon, label, variant, disabled, onClick }) => {
                  return (
                    <Button
                      key={label}
                      label={label}
                      icon={icon}
                      size="small"
                      variant={variant}
                      disabled={disabled}
                      onClick={onClick}
                    />
                  );
                }
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

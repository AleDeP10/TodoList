"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, modalVariants } from "@/lib/animationVariants";

interface AboutAuthorModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  footerActions?: { label: string; onClick: () => void }[];
}

export default function AboutAuthorModal({
  title,
  children,
  onClose,
  footerActions,
}: AboutAuthorModalProps) {
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleBackdropClick}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 py-6"
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="bg-[var(--background)] text-[var(--foreground)] rounded-lg shadow-lg w-full max-w-lg"
        >
          {/* 🧢 Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--foreground)]">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-sm px-2 py-1 bg-[var(--foreground)] text-[var(--background)] rounded"
            >
              ×
            </button>
          </div>

          {/* 📄 Content */}
          <div className="p-6">{children}</div>

          {/* 🧼 Footer */}
          {footerActions?.length && (
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[var(--foreground)]">
              {footerActions.map(({ label, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="text-sm px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

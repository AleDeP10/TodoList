"use client";

//import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  closeHandlers?: Record<string, () => void>;
  footerActions?: { label: string; onClick: () => void }[];
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 py-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-[var(--background)] text-[var(--foreground)] rounded-lg shadow-lg w-full max-w-lg"
        >
          {/* 🔘 Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--foreground)]">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-sm px-2 py-1 bg-[var(--foreground)] text-[var(--background)] rounded"
              >
                ×
              </button>
            </div>
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

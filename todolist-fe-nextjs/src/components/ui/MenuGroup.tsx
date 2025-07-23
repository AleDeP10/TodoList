'use client';

import { useRef, RefObject } from "react";
import type { MenuGroup as ItemType } from "@/types/menu";
import MenuItem from "./MenuItem";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type MenuGroupProps = {
  label: string;
  items: ItemType[];
  section: string;
  isOpen: boolean;
  onOpen: (section: string) => void;
  onClose: () => void;
};

export default function MenuGroup({
  label,
  items,
  section,
  isOpen,
  onOpen,
  onClose,
}: MenuGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref as RefObject<HTMLElement>, onClose);

  return (
    <div
      className="relative"
      ref={ref}
      onMouseEnter={() => onOpen(section)}
      onMouseLeave={onClose}
    >
      <button
        className="px-3 py-1 bg-[var(--menu-bg)] text-sm font-semibold rounded hover:brightness-110 transition"
      >
        {label}
      </button>

      {/* Overlay menu container */}
      <div className="absolute top-full left-0 w-max min-w-[140px] z-50">
        <div
          className={`bg-[var(--menu-bg)] rounded shadow-md overflow-hidden transition-opacity duration-150 p-2 flex flex-col gap-2 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {items.map((item) => (
            <MenuItem
              key={item.label}
              {...item}
              onClick={() => {
                item.onClick?.();
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
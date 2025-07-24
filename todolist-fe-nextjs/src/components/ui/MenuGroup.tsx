'use client';

import { useState, useRef } from "react";
import MenuItem from "./MenuItem";
import type { MenuItemData } from "@/types/menu";

export default function MenuGroup({
  label,
  items,
}: {
  label: string;
  items: MenuItemData[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: MenuItemData) => {
    item.onClick?.();
    setOpen(false); // 🔒 Chiude il menu al click
  };

  return (
    <div
      className="relative"
      ref={containerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="px-3 py-2 bg-[var(--menu-bg)] text-sm font-semibold rounded hover:brightness-110"
      >
        {label}
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 bg-[var(--menu-bg)] rounded shadow-md min-w-[140px] p-2">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <MenuItem
                key={item.label}
                {...item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useRef, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import type { MenuItemData } from "../../types/menu";

export default function MenuGroup({
  label,
  items,
  isActive,
  onActivate,
  onDeactivate,
}: {
  label: string;
  items: MenuItemData[];
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Chiudi al click esterno
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onDeactivate();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onDeactivate]);

  // Toggle manuale
  const handleToggle = () => {
    if (isActive) {
      onDeactivate();
    } else {
      onActivate();
    }
  };

  return (
    <div
      className="relative"
      ref={containerRef}
      onMouseEnter={() => {
        if (!isTouch) onActivate();
      }}
      onMouseLeave={() => {
        if (!isTouch) onDeactivate();
      }}
    >
      <button
        className="px-3 py-2 bg-[var(--menu-bg)] text-[var(--menu-fg)] text-sm font-semibold rounded hover:brightness-110"
        onTouchStart={() => {
          setIsTouch(true);
          handleToggle();
        }}
        onTouchEnd={() => {
          setIsTouch(false);
        }}
        onClick={() => {
          if (!isTouch) handleToggle();
        }}
      >
        {label}
      </button>

      {isActive && (
        <div className="absolute top-full left-0 z-50 bg-[var(--menu-bg)] rounded shadow-md min-w-[160px] p-2">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <MenuItem
                key={item.label}
                {...item}
                onClick={() => {
                  item.onClick?.();
                  onDeactivate();
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

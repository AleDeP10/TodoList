import React, { useState } from "react";
import type { ReactNode } from "react";

export interface IconButtonProps {
  icon: ReactNode;
  ariaLabel?: string;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

export default function IconButton({
  icon,
  ariaLabel = "Icon Button",
  onClick,
  color = "var(--fg)",
  disabled = false,
}: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    color,
    filter: !disabled && isHovered ? "brightness(90%)" : undefined,
    cursor: disabled ? "default" : "pointer",
    transition: "filter 0.2s ease",
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-full p-1 transition"
      style={style}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

import type { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  size?: number;
  color?: string;
}

export default function IconButton({
  icon,
  onClick,
  size = 20,
  color = 'var(--fg)',
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full p-1 hover:[filter:brightness(90%)] transition"
      style={{ color }}
    >
      <span style={{ fontSize: size }}>{icon}</span>
    </button>
  );
}
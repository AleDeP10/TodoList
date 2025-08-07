import type { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  color?: string;
}

export default function IconButton({
  icon,
  onClick,
  color = 'var(--fg)',
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full p-1 transition hover:[filter:brightness(90%)] hover:cursor-pointer"
      style={{ color }}
    >
      {icon}
    </button>
  );
}

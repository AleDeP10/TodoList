type MenuItemProps = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export default function MenuItem({
  label,
  icon,
  href,
  onClick,
}: MenuItemProps) {
  const handleMouseDown = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      onClick?.();
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      className="text-sm text-left px-2 py-1 rounded hover:bg-[var(--hover)]"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );
}

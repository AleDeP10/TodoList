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
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // avoid interferences by useOutsideClick

    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      onClick?.();
    }
  };

  const content = (
    <span className="flex items-center gap-2 hover:underline">
      {icon}
      {label}
    </span>
  );

  return (
    <button onMouseDown={handleClick} className="text-sm text-left">
      {content}
    </button>
  );
}

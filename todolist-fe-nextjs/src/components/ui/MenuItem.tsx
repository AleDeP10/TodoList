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
  const content = (
    <span className="flex items-center gap-2 hover:underline">
      {icon}
      {label}
    </span>
  );

  return href ? (
    <a href={href} className="text-sm">
      {content}
    </a>
  ) : (
    <button onClick={onClick} className="text-sm text-left">
      {content}
    </button>
  );
}

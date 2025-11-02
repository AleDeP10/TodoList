import React from "react";
import clsx from "clsx";

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Text or elements to display inside the anchor */
  children: React.ReactNode;

  /** Optional custom CSS classes */
  className?: string;

  /** Whether to underline the text (default: true) */
  underline?: boolean;

  /** If true, opens the link in a new tab with safe attributes */
  external?: boolean;

  /** Optional click handler that overrides default navigation */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const Anchor: React.FC<AnchorProps> = ({
  children,
  className,
  underline = true,
  external = false,
  href,
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      event.preventDefault(); // Prevent default navigation
      onClick(event);         // Trigger custom click behavior
    }
  };

  return (
    <a
      href={href}
      className={clsx(
        "text-blue-600 hover:text-blue-800 transition-colors",
        underline && "underline underline-offset-2 decoration-blue-600 cursor-pointer",
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

import "./button.css";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps {
  /** Button contents */
  label?: string;
  /** Icon element shown before label */
  icon?: ReactNode;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Variant to define background styling */
  variant?: ButtonVariant;
  /** Disable the button on condition */
  disabled?: boolean;
  /** Tooltip text for icon-only buttons */
  tooltip?: string;
  /** Optional override background color */
  backgroundColor?: string;
  /** Optional override foreground color */
  foregroundColor?: string;
  /** Click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  label,
  icon,
  size = "medium",
  variant = "primary",
  disabled = false,
  tooltip,
  backgroundColor,
  foregroundColor,
  onClick,
}: ButtonProps) => {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-3 text-lg",
  };

  const baseClasses = "rounded inline-flex items-center gap-2 transition";

  const disabledClasses = disabled
    ? "opacity-50 grayscale-70 cursor-not-allowed"
    : "";

  const customStyle = {
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(foregroundColor ? { color: foregroundColor } : {}),
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "storybook-button",
        `storybook-button--${size}`,
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
      ].join(" ")}
      style={customStyle}
      title={tooltip}
      disabled={disabled}
    >
      <div
        className={`flex justify-center items-center ${
          icon && label ? "gap-2 " : ""
        }w-full`}
      >
        {icon && <span>{icon}</span>}
        <span className="hidden sm:inline">{label}</span>
      </div>
    </button>
  );
};

import React, { useState } from "react";
import type { ReactNode } from "react";
import { useCssVariable } from "../../hooks/useCssVariable";
import { useResponsiveVisibility } from "../../hooks/useResponsiveVisibility";
import "./button.css";

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
  const { sm } = useResponsiveVisibility();
  const [isHovered, setIsHovered] = useState(false);

  const rawBg = useCssVariable(
    backgroundColor
      ? backgroundColor
      : variant === "primary"
      ? "--color-blue-600"
      : variant === "secondary"
      ? "--color-gray-300"
      : variant === "danger"
      ? "--color-red-600"
      : "--color-gray-400"
  );

  const rawFg = useCssVariable(
    foregroundColor
      ? foregroundColor
      : variant === "secondary"
      ? "--color-gray-800"
      : "" // fallback for primary/danger/default
  );

  const bgColor = backgroundColor || rawBg || "transparent";
  const fgColor =
    foregroundColor ||
    rawFg ||
    (variant === "secondary" ? "#000000" : "#ffffff");

  // 🔧 Background color logic
  // let bgColor: string = "";
  // if (backgroundColor) {
  //   bgColor = backgroundColor;
  // } else if (variant) {
  //   switch (variant) {
  //     case "primary":
  //       bgColor = getCSSVariable("--color-blue-600");
  //       break;
  //     case "secondary":
  //       bgColor = getCSSVariable("--color-gray-300");
  //       break;
  //     case "danger":
  //       bgColor = getCSSVariable("--color-red-600");
  //       break;
  //     default:
  //       bgColor = getCSSVariable("--color-gray-400");
  //   }
  // }

  // // 🎨 Foreground color logic
  // let fgColor: string = "";
  // if (foregroundColor) {
  //   fgColor = foregroundColor;
  // } else if (variant) {
  //   switch (variant) {
  //     case "primary":
  //     case "danger":
  //       fgColor = "#ffffff";
  //       break;
  //     case "secondary":
  //       fgColor = getCSSVariable("--color-gray-800");
  //       break;
  //     default:
  //       fgColor = "#000000";
  //   }
  // }

  const baseClasses = "rounded inline-flex items-center transition";

  const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-3 text-lg",
  };

  const hasIcon = !!icon;
  const hasLabel = !!label;

  const customStyle = {
    backgroundColor: bgColor || "transparent",
    color: fgColor || "inherit",
    transition: "background-color 0.2s ease, color 0.2s ease",
    filter: disabled
      ? "grayscale(100%) brightness(85%)"
      : isHovered
      ? "brightness(90%)"
      : undefined,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={[
        "storybook-button",
        `storybook-button--${size}`,
        baseClasses,
        sizeClasses[size],
      ].join(" ")}
      style={customStyle}
      title={tooltip}
      disabled={disabled}
      aria-label={label ?? tooltip ?? "Button"}
    >
      <div className="flex items-center gap-x-2">
        {hasIcon && (
          <span className="inline-flex items-center justify-center">
            {icon}
          </span>
        )}
        {hasLabel && (
          <span
            className={`${
              sm && icon ? "sr-only" : ""
            } leading-none align-middle`}
          >
            {label}
          </span>
        )}
      </div>
    </button>
  );
};

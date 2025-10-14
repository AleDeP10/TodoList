import React from "react";
import { useResponsiveVisibility } from "../hooks";
import { Helper } from "../types/Validation";

export type HelperLayout = "grid" | "compact";

export interface ValidationRendererProps {
  // Message to display below the control (error or warning)
  helper: Helper | null;

  // Layout mode: "grid" aligns within 12-column grid, "compact" renders in column.
  layout?: HelperLayout;
}

/**
 * Component for rendering a single validation message below a form control.
 * 
 * Accepts a HelperText object and displays it with appropriate styling
 * based on its severity (error or warning).

 * Supports both compact and grid layouts to match control positioning.
 * 
 * Used across all form controls to ensure consistent validation rendering. 
 */
export default function ValidationRenderer({
  helper, // Validation message to display
  layout, // Layout mode: "compact" or "grid"
}: ValidationRendererProps) {
  const { sm } = useResponsiveVisibility();

  // Render message if helper is present and has text
  if (helper) {
    const { type, text } = helper;
    if (text) {
      const message = (
        <p
          className={`text-left text-xs ${
            type === "error" ? "text-red-500" : "text-orange-500"
          }`}
          style={type === "warning" ? {color: "#f97316"} : {}}
          role={type === "error" ? "alert" : "alert"}
        >
          {text}
        </p>
      );

      // Compact or mobile layout: inline block
      if (layout === "compact" || sm) {
        return <div className="flex justify-start">{message}</div>;
      }

      // Grid layout: aligned under control
      return (
        <div className="grid grid-cols-12">
          <div className="col-span-3">{""}</div>
          <div className="col-span-9 flex justify-start">{message}</div>
        </div>
      );
    }
  }

  // No message to render
  return <></>;
}

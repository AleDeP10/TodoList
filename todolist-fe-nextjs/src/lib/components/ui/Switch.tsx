import React, { useId } from "react";
import { Control, Helper } from "../../types/Validation";
import { useResponsiveVisibility } from "../../hooks";
import ValidationRenderer from "../ValidationRenderer";

export type SwitchVariant = "grid" | "compact";

export interface SwitchProps extends Control {
  variant?: SwitchVariant;
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  name?: string;
  error?: boolean;
  helper?: Helper | null;
}

export default function Switch({
  variant = "compact",
  checked,
  onChange,
  label,
  name,
  helper = null,
}: SwitchProps) {
  const { sm } = useResponsiveVisibility();
  const generatedId = useId();
  const switchId = `${name ?? "switch"}-${generatedId}`;

  const LabelComponent = (
    <label htmlFor={switchId} className="text-left text-sm font-medium">
      {label}
    </label>
  );
  const SwitchComponent = (
    <button
      id={switchId}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors focus:outline-none ${
        checked ? "bg-yellow-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      ></div>
    </button>
  );

  return (
    <>
      {variant === "compact" ? (
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            className={`relative w-10 h-5 rounded-full transition-colors ${
              checked ? "bg-yellow-500" : "bg-gray-300"
            }`}
            onClick={() => onChange(!checked)}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                checked ? "translate-x-5" : ""
              }`}
            ></div>
          </div>
          {label && LabelComponent}
        </label>
      ) : sm ? (
        <div className="flex flex-col gap-2 w-full">
          {LabelComponent}
          {SwitchComponent}
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 items-center my-2">
          <div className="col-span-3 text-left">{LabelComponent}</div>
          <div className="col-span-9 text-left">{SwitchComponent}</div>
        </div>
      )}
      <ValidationRenderer helper={helper} />
    </>
  );
}

import React, { useId } from "react";

export type SwitchVariant = "grid" | "compact";

export interface SwitchProps {
  variant?: SwitchVariant;
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  name?: string;
}

export default function Switch({
  variant = "compact",
  checked,
  onChange,
  label,
  name,
}: SwitchProps) {
  const generatedId = useId();
  const switchId = `${name ?? "switch"}-${generatedId}`;

  return variant === "compact" ? (
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
      {label && <span className="text-sm select-none">{label}</span>}
    </label>
  ) : (
    <div className="grid grid-cols-12 gap-4 items-center my-2">
      <label
        htmlFor={switchId}
        className="col-span-3 text-left text-sm font-medium"
      >
        {label}
      </label>

      <div className="col-span-9 text-left">
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
      </div>
    </div>
  );
}

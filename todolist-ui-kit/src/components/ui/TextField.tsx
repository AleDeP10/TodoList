import React, { InputHTMLAttributes, useId, useState } from "react";
import { Control, Helper } from "../../types/Validation";
import IconButton from "../ui/IconButton";
import { Icons } from "../Icons";
import { useResponsiveVisibility } from "../../hooks";
import ValidationRenderer from "../ValidationRenderer";

export type TextFieldVariant = "text" | "password";

/**
 * Props for the TextField control.
 * Extends the base Control type and adds textfield-specific fields.
 */
export interface TextFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    Control {
  variant?: TextFieldVariant;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label: string;
  error?: boolean;
  helper?: Helper | null;
}

export default function TextField({
  variant = "text",
  value,
  onChange,
  name,
  label,
  error = false,
  helper = null,
  ...rest
}: TextFieldProps) {
  const { sm } = useResponsiveVisibility();
  const generatedId = useId();
  const inputId = `${name ?? "textfield"}-${generatedId}`;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = variant === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : "text";

  const LabelComponent = (
    <label htmlFor={inputId} className="text-left text-sm font-medium">
      {label}
    </label>
  );

  const InputContainer = (
    <div className="w-full">
      <div className="flex w-full">
        <input
          type={inputType}
          id={inputId}
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
          onBlur={(e) => rest.onBlur?.(e)}
          aria-label={label}
          className={`w-full border px-2 py-1 rounded !bg-white !text-black ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...rest}
        />
        {isPassword && (
          <>
            {" "}
            <IconButton
              icon={showPassword ? Icons.hidePassword : Icons.showPassword}
              ariaLabel={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {sm ? (
        <div className="flex flex-col gap-2 w-full">
          {LabelComponent}
          {InputContainer}
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 items-center my-2 w-full">
          <div className="col-span-3">{LabelComponent}</div>
          <div className="col-span-9 w-full flex items-center gap-2">
            {InputContainer}
          </div>
        </div>
      )}
      <ValidationRenderer helper={helper} />
    </>
  );
}

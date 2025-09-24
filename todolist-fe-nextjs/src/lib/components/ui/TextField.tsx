import React, { InputHTMLAttributes, useId, useState } from "react";
import IconButton from "../ui/IconButton";
import { Icons } from "../Icons";

export type TextFieldVariant = "text" | "password";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: TextFieldVariant;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label: string;
  error?: boolean;
  helperText?: string;
}

export default function TextField({
  variant = "text",
  value,
  onChange,
  name,
  label,
  error = false,
  helperText,
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = `${name ?? "textfield"}-${generatedId}`;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = variant === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : "text";

  return (
    <div className="grid grid-cols-12 gap-4 items-center my-2 w-full">
      <label
        htmlFor={inputId}
        className="col-span-3 text-left text-sm font-medium"
      >
        {label}
      </label>

      <div className="col-span-9 w-full flex items-center gap-2">
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
            />{" "}
            {isPassword && (
              <IconButton
                icon={showPassword ? Icons.hidePassword : Icons.showPassword}
                ariaLabel={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
          {helperText && (
            <div className="col-span-12 flex justify-start">
              <p className="text-xs text-red-500 mt-1" role="alert">
                {helperText}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { InputHTMLAttributes, useId } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label: string;
  error?: boolean;
  helperText?: string;
}

export default function TextField({
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

  return (
    <div className="grid grid-cols-12 gap-4 items-center my-2 w-full">
      <label htmlFor={inputId} className="col-span-3 text-left text-sm font-medium">
        {label}
      </label>

      <div className="col-span-9 w-full">
        <input
          type="text"
          id={inputId}
          name={name}
          value={value}
          onChange={(e) => {
            if (process.env.NODE_ENV !== "production") {
              console.log("TextField[change]", {
                name,
                value: e.target.value,
              });
            }
            onChange(e);
          }}
          onBlur={(e) => {
            if (process.env.NODE_ENV !== "production") {
              console.log("TextField[blur]", {
                name,
                value: e.target.value,
              });
            }
            rest.onBlur?.(e);
          }}
          aria-label={label}
          className={`w-full border px-2 py-1 rounded !bg-white !text-black ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...rest}
        />
        {helperText && (
          <p className="text-xs text-red-500 mt-1" role="alert">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}

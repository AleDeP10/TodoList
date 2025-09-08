import React, { InputHTMLAttributes } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  error?: boolean;
  helperText?: string;
}

export default function TextField({
  value,
  onChange,
  name,
  error = false,
  helperText,
  ...rest
}: TextFieldProps) {
  return (
    <div className="w-full">
      <input
        type="text"
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
        className={`w-full border px-2 py-1 rounded !bg-white !text-black ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {helperText && <p className="text-xs text-red-500 mt-1">{helperText}</p>}
    </div>
  );
}

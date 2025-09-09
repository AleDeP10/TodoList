import React, { useId } from "react";

export interface DropdownProps<T> {
  value: T;
  options: T[];
  onChange: (newValue: T) => void;
  getOptionValue?: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  label: string;
  name?: string;
  error?: boolean;
  helperText?: string;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

export default function Dropdown<T>({
  value,
  options,
  onChange,
  getOptionValue = (option: T) => String(option),
  getOptionLabel = (option: T) => String(option),
  label,
  name,
  error = false,
  helperText,
  onBlur,
}: DropdownProps<T>) {
  const generatedId = useId();
  const selectId = `${name ?? "dropdown"}-${generatedId}`;

  return (
    <div className="grid grid-cols-12 gap-4 items-center my-2 w-full">
      <label htmlFor={selectId} className="col-span-3 text-left text-sm font-medium">
        {label}
      </label>

      <div className="col-span-9 w-full">
        <select
          id={selectId}
          name={name}
          value={getOptionValue(value)}
          onChange={(e) => {
            const selected = options.find(
              (opt) => getOptionValue(opt) === e.target.value
            );
            if (selected) onChange(selected);
          }}
          onBlur={onBlur}
          aria-label={label}
          className={` w-full p-2 text-sm rounded !bg-white !text-black ${
            error ? "border-red-500" : "border-gray-300"
          } border focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black`}
        >
          {options.map((opt, index) => (
            <option
              key={index}
              value={getOptionValue(opt)}
              className="!bg-white !text-black"
            >
              {getOptionLabel(opt)}
            </option>
          ))}
        </select>

        {helperText && (
          <p className="text-xs text-red-500 mt-1" role="alert">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}

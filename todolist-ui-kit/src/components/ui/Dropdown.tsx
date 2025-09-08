import React from "react";

export interface DropdownProps<T> {
  value: T;
  options: T[];
  onChange: (newValue: T) => void;
  getOptionValue?: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  placeholder?: string;
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
  error = false,
  helperText,
  onBlur,
}: DropdownProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selected = options.find(
      (opt) => getOptionValue(opt) === selectedValue
    );
    if (selected !== undefined) {
      onChange(selected);
    }
  };

  return (
    <div className="w-full">
      <select
        value={getOptionValue(value)}
        onChange={handleChange}
        onBlur={onBlur}
        className={`text-sm p-2 rounded w-full !bg-white !text-black ${
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
      {helperText && <p className="text-xs text-red-500 mt-1">{helperText}</p>}
    </div>
  );
}


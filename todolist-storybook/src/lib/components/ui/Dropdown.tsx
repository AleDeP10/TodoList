import React from "react";

export interface DropdownProps<T> {
  value: T;
  options: T[];
  onChange: (newValue: T) => void;
  getOptionValue?: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  placeholder?: string;
}

export default function Dropdown<T>({
  value,
  options,
  onChange,
  getOptionValue = (option: T) => String(option),
  getOptionLabel = (option: T) => String(option),
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
    <select
      value={getOptionValue(value)}
      onChange={handleChange}
      className="text-sm p-2 rounded border border-gray-300
                 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--fg)]
                 bg-[var(--bg)] text-[var(--fg)]"
    >
      {options.map((opt, index) => (
        <option
          key={index}
          value={getOptionValue(opt)}
          className="bg-[var(--bg)] text-[var(--fg)]"
        >
          {getOptionLabel(opt)}
        </option>
      ))}
    </select>
  );
}

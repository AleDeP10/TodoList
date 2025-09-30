import React, { useId } from "react";
import { useResponsiveVisibility } from "../../hooks";
import { Control, Helper } from "../../types/Validation";
import ValidationRenderer from "../ValidationRenderer";

export type DropdownVariant = "grid" | "compact";

/**
 * Props for the Dropdown control.
 * Extends the base Control type and adds selection-specific fields.
 */
export interface DropdownProps<T> extends Control {
  variant?: DropdownVariant;
  value: T;
  options: T[];
  onChange: (newValue: T) => void;
  getOptionValue?: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  label: string;
  error?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  helper?: Helper | null;
}

interface SelectComponentProps<T> {
  selectId: string;
  value: T;
  options: T[];
  onChange: (newValue: T) => void;
  getOptionValue?: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  label: string;
  error?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

function SelectComponent<T>({
  selectId,
  value,
  options,
  onChange,
  onBlur,
  getOptionValue = (option: T) => String(option),
  getOptionLabel = (option: T) => String(option),
  label,
  error = false,
}: SelectComponentProps<T>) {
  return (
    <select
      id={selectId}
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
  );
}

export default function Dropdown<T>({
  variant,
  value,
  options,
  onChange,
  onBlur,
  getOptionValue = (option: T) => String(option),
  getOptionLabel = (option: T) => String(option),
  label,
  error = false,
  helper = null,
}: DropdownProps<T>) {
  const { sm } = useResponsiveVisibility();
  const generatedId = useId();
  const selectId = `dropdown-${generatedId}`;

  const LabelComponent = (
    <label htmlFor={selectId} className="text-left text-sm font-medium">
      {label}
    </label>
  );

  const SelectContainer = (
    <div className="w-full">
      <SelectComponent
        selectId={selectId}
        value={value}
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        error={error}
      />
    </div>
  );

  if (process.env.NEXT_PUBLIC_ENV !== "production") {
    console.log("Dropdown", { label, value, error, helper });
  }

  return (
    <>
      {variant === "compact" ? (
        <div className="w-fit">
          <SelectComponent
            selectId={selectId}
            value={value}
            options={options}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
            error={error}
          />
        </div>
      ) : sm ? (
        <div className="flex flex-col gap-2 w-full">
          {LabelComponent}
          {SelectContainer}
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 items-center my-2 w-full">
          <div className="col-span-3">{LabelComponent}</div>
          <div className="col-span-9 w-full">{SelectContainer}</div>
        </div>
      )}
      <ValidationRenderer helper={helper} layout={variant} />
    </>
  );
}

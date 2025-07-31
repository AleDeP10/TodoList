interface DropdownProps<T> {
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
  getOptionValue = (option) => String(option),
  getOptionLabel = (option) => String(option),
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
      className="text-sm p-1 rounded border border-gray-300"
    >
      {options.map((opt, index) => (
        <option key={index} value={getOptionValue(opt)}>
          {getOptionLabel(opt)}
        </option>
      ))}
    </select>
  );
}

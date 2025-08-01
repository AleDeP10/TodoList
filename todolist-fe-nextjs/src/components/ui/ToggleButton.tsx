'use client';

import { useState } from 'react';

type ToggleButtonProps = {
  initialValue: string;
  toggleTo: string;
  label: (value: string) => React.ReactNode;
  onToggle?: (newValue: string) => void;
};

export default function ToggleButton({
  initialValue,
  toggleTo,
  label,
  onToggle,
}: ToggleButtonProps) {
  const [value, setValue] = useState(initialValue);

  const handleToggle = () => {
    const newValue = value === initialValue ? toggleTo : initialValue;
    setValue(newValue);
    onToggle?.(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-1 rounded text-[var(--bg)] bg-[var(--fg)] text-sm"
    >
      {label(value)}
    </button>
  );
}

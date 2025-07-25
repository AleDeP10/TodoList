'use client';

import { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export default function TextField({
  value,
  onChange,
  name,
  ...rest
}: TextFieldProps) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-[var(--fg)] bg-transparent text-[var(--fg)] px-2 py-1 rounded"
      {...rest}
    />
  );
}
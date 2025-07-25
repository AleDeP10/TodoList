'use client';

interface SwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export default function Switch({ checked, onChange, label: caption }: SwitchProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        className={`relative w-10 h-5 rounded-full transition-colors ${
          checked ? 'bg-yellow-500' : 'bg-gray-300'
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        ></div>
      </div>
      {caption && <span className="text-sm select-none">{caption}</span>}
    </label>
  );
}
export default function ToggleButtonGroup<T extends string>({
  options,
  selected,
  onChange,
}: {
  options: T[];
  selected: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-2" role="group" aria-label="Toggle">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1 rounded border text-sm ${
            selected === opt ? "bg-blue-600 text-white" : "border-gray-300"
          }`}
        >
          {opt.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

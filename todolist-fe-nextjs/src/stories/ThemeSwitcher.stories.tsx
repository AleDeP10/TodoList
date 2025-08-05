import { useTheme } from "@/hooks/useTheme";

export default {
  title: "UI/ThemeSwitcher",
};

export const Default = () => {
  const [theme, setTheme] = useTheme();
  const options = ["dark", "light", "custom"] as const;

  return (
    <div className="space-y-4">
      <label className="block font-medium text-sm">Select Theme</label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as typeof theme)}
        className="border px-2 py-1 rounded"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

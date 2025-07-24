import { useTheme } from "@/hooks/useTheme";
import Dropdown from "./Dropdown";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme();

  return (
    <Dropdown
      value={theme}
      options={["dark", "light", "custom"]}
      onChange={(newTheme) => setTheme(newTheme)}
    />
  );
}
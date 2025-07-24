import ToggleButton from "../components/ui/ToggleButton";
import useThemeToggle from "@/hooks/useThemeToggle";
import useLangToggle from "@/hooks/useLangToggle";

export default {
  title: "UI/ToggleButton",
  component: ToggleButton,
};

export const ThemeToggle = () => {
  const { theme, toggle } = useThemeToggle();

  return (
    <ToggleButton
      initialValue={theme}
      toggleTo={theme === "dark" ? "light" : "dark"}
      label={(val) => (val === "dark" ? "🌙 Dark" : "☀️ Light")}
      onToggle={toggle}
    />
  );
};

export const LanguageToggle = () => {
  const { lang, toggle } = useLangToggle();

  return (
    <ToggleButton
      initialValue={lang}
      toggleTo={lang === "it" ? "en" : "it"}
      label={(val) => val.toUpperCase()}
      onToggle={toggle}
    />
  );
};

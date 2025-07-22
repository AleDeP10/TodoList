import { useEffect, useState } from 'react';

export default function useThemeToggle(storageKey = 'theme') {
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) ?? 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  return {
    theme,
    toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
"use client";

import React from "react";
import { ThemeName } from "../../types/ThemeName";
import { useTheme } from "../../hooks/useTheme";
import Dropdown from "./Dropdown";

export type ThemeSwitcherProps = Record<string, never>;

export default function ThemeSwitcher({}: ThemeSwitcherProps) {
  const [theme, setTheme] = useTheme();

  return (
    <Dropdown
      variant="compact"
      label={"theme"}
      value={theme}
      options={["dark", "custom", "light"]}
      onChange={(newTheme) => setTheme(newTheme as ThemeName)} />
  );
}

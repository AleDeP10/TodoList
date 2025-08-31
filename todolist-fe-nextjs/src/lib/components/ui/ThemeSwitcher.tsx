"use client";

import React from "react";
import { ThemeName } from "../../types/ThemeName";
import { useTheme } from "../../hooks/useTheme";
import Dropdown from "./Dropdown";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ThemeSwitcherProps {}

export default function ThemeSwitcher({}: ThemeSwitcherProps) {
  const [theme, setTheme] = useTheme();

  return (
    <Dropdown
      value={theme}
      options={["dark", "light", "custom"]}
      onChange={(newTheme) => setTheme(newTheme as ThemeName)}
    />
  );
}

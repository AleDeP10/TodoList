"use client";

import React, { useEffect } from "react";
import { Meta } from "@storybook/react";
import { useTheme } from "../lib/hooks/useTheme";
import ThemeSwitcher, {
  ThemeSwitcherProps,
} from "../lib/components/ui/ThemeSwitcher";
import "./ThemeSwitcher.stories.css";

const meta: Meta<ThemeSwitcherProps> = {
  title: "Theming/ThemeSwitcher",
  component: ThemeSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const ThemePreview = () => {
  const [, setTheme] = useTheme();

  useEffect(() => {
    setTheme("custom");
    localStorage.setItem("theme", "custom");
  }, [setTheme]);

  return (
    <div className="theme-preview">
      <div className="theme-control">
        <label className="theme-label">Pick a theme</label>
        <div className="theme-switcher">
          <ThemeSwitcher />
        </div>
      </div>
      <div className="theme-section background">
        <h2>Background</h2>
        <p>Primary background color</p>
      </div>
      <div className="theme-section navbar">
        <h2>Navbar</h2>
        <p>Navigation bar styling</p>
      </div>
      <div className="theme-section menu">
        <h2>Menu</h2>
        <p>Sidebar or dropdown menu</p>
      </div>
      <div className="theme-section modal">
        <h2>Modal</h2>
        <p>Dialog or overlay styling</p>
      </div>
    </div>
  );
};

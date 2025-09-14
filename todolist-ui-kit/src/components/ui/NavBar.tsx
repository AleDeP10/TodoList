"use client";

import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useResponsiveVisibility } from "../../hooks/useResponsiveVisibility";
import { MenuSections } from "../../types/menu";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import MenuGroup from "./MenuGroup";

export interface NavBarProps {
  menuItems: MenuSections;
}

export default function NavBar({ menuItems }: NavBarProps) {
  const t = useTranslation();
  const isMobile = useResponsiveVisibility();

  return isMobile ? (
    <nav className="grid gap-6 px-4 py-4 border-b text-[var(--navbar-fg)] bg-gradient-to-r from-[var(--navbar-start)] to-[var(--navbar-end)]">
      <div className="w-full flex justify-end mb-2">
        <div className="flex gap-2 items-center w-fit">
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-start w-full overflow-x-auto">
        {Object.entries(menuItems).map(([section, items]) => (
          <MenuGroup
            key={section}
            label={t(`menu.section.${section.toLowerCase()}`)}
            items={items}
          />
        ))}
      </div>
    </nav>
  ) : (
    <nav className="flex flex-wrap justify-between items-center px-6 py-4 gap-2 border-b text-[var(--navbar-fg)] bg-gradient-to-r from-[var(--navbar-start)] to-[var(--navbar-end)]">
      <div className="flex items-center gap-3">
        {Object.entries(menuItems).map(([section, items]) => (
          <MenuGroup
            key={section}
            label={t(`menu.section.${section.toLowerCase()}`)}
            items={items}
          />
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </nav>
  );
}

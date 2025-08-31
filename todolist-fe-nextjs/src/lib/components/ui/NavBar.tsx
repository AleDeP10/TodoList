"use client";

import React from "react";
import { useT } from "../../hooks/useTranslation";
import { MenuSections } from "../../types/menu";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import MenuGroup from "./MenuGroup";

export interface NavBarProps {
  menuItems: MenuSections;
  children?: React.ReactNode;
}

export default function NavBar({ menuItems, children }: NavBarProps) {
  const t = useT();

  return (
    <nav className="flex flex-wrap-reverse justify-between items-center px-6 py-4 gap-2 border-b text-[var(--navbar-fg)] bg-gradient-to-r from-[var(--navbar-start)] to-[var(--navbar-end)]">
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
        {children}
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </nav>
  );
}

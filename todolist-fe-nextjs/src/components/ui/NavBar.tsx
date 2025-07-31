"use client";

import { useT } from "@/hooks/useTranslation";
import { MenuSections } from "@/types/menu";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import MenuGroup from "./MenuGroup";

export default function NavBar({
  menuItems,
  children,
}: {
  menuItems: MenuSections;
  children?: React.ReactNode;
}) {
  const t = useT();

  return (
    <nav className="flex flex-wrap-reverse justify-between items-center px-6 py-4 gap-2 border-b text-[var(--navbar-label)] bg-gradient-to-r from-[var(--navbar-start)] to-[var(--navbar-end)]">
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

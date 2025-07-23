"use client";


import { useState } from "react";
import { useT } from "@/hooks/useTranslation";
import { MenuItemsMap } from "@/types/menu";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import MenuGroup from "./MenuGroup";

export default function NavBar({
  menuItems,
  children,
}: {
  menuItems: MenuItemsMap;
  children?: React.ReactNode;
}) {
  const [openedGroup, setOpenedGroup] = useState<string | null>(null);
  const t = useT();

  return (
    <nav className="px-6 py-4 border-b text-[var(--navbar-label)] bg-gradient-to-r from-[var(--navbar-start)] to-[var(--navbar-end)]">
      <div className="flex justify-between items-center">
        {/* Menù Principale */}
        <div className="flex items-center gap-1">
          {Object.entries(menuItems).map(([section, items]) => (
            <MenuGroup
              key={section}
              label={t(`menu.section.${section.toLowerCase()}`)}
              items={items}
  section={section}
  isOpen={openedGroup === section}
  onOpen={() => setOpenedGroup(section)}
  onClose={() => setOpenedGroup(null)}
/>

          ))}
        </div>

        {/* Azioni */}
        <div className="flex gap-4 items-center">
          {children}
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      </div>
    </nav>
  );
}

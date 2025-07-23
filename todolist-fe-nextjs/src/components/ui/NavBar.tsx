"use client";

import { ReactNode } from "react";
import { useT } from "@/hooks/useTranslation";
import LangSwitcher from "../LangSwitcher";
import MenuItem from "./MenuItem";

type MenuGroup = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

type MenuItemsMap = {
  [key: string]: MenuGroup[];
};

export default function NavBar({
  menuItems,
  children,
}: {
  menuItems: MenuItemsMap;
  children?: ReactNode;
}) {
  const t = useT();
  return (
    <nav className="flex flex-col gap-4 px-6 py-4 border-b border-[var(--foreground)] bg-[var(--background)]">
      <div className="flex justify-between items-center">
        {Object.entries(menuItems).map(([section, items]) => (
          <div key={section}>
            <h4 className="font-semibold mb-1">{t(`menu.section.${section.toLocaleLowerCase()}`)}</h4>
            <div className="flex gap-3">
              {items.map((item) => (
                <MenuItem key={item.label} {...item} />
              ))}
            </div>
          </div>
        ))}
        <div>{children}</div>
      </div>
      <LangSwitcher />
    </nav>
  );
}

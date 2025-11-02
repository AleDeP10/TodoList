import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { useTranslation } from "../lib/hooks/useTranslation";
import { MenuIcons } from "../lib/components/Icons";
import MenuGroup from "../lib/components/ui/MenuGroup";
import MenuItem from "../lib/components/ui/MenuItem";
import { MenuTestWrapper } from "./MenuTestWrapper";

const meta: Meta<typeof MenuGroup> = {
  title: "Layout/MenuGroup",
  component: MenuGroup,
  subcomponents: { MenuItem },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MenuGroup>;

export const Example: Story = {
  render: () => {
    const t = useTranslation();

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [content, setContent] = useState<string>("");

    const menuItems = {
      Functionalities: [
        {
          label: t("menu.functionalities.dashboard"),
          icon: MenuIcons.dashboard,
          onClick: () => setContent("Dashboard"),
        },
        {
          label: t("menu.functionalities.tasks"),
          icon: MenuIcons.tasks,
          onClick: () => setContent("Tasks"),
        },
        {
          label: t("menu.functionalities.users"),
          icon: MenuIcons.users,
          onClick: () => setContent("Users"),
        },
      ],
      About: [
        {
          label: t("menu.about.portfolio"),
          icon: MenuIcons.portfolio,
          href: "https://aledep10.github.io",
          onClick: () => {},
        },
      ],
    };

    return (
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <MenuTestWrapper>
            {(setContent) => (
              <div className="flex gap-2">
                {Object.entries(menuItems).map(([section, items]) => (
                  <MenuGroup
                    key={section}
                    label={section}
                    items={items.map((item) => ({
                      ...item,
                      onClick: () => {
                        item.onClick?.();
                        setContent(item.label);
                      },
                    }))}
                    isActive={activeMenu === section}
                    onActivate={() => setActiveMenu(section)}
                    onDeactivate={() => setActiveMenu(null)}
                  />
                ))}
              </div>
            )}
          </MenuTestWrapper>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {content || "No action yet"}
        </div>
      </div>
    );
  },
};

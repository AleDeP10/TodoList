import { Meta, StoryObj } from "@storybook/nextjs-vite";
import MenuGroup from "@/components/ui/MenuGroup";
import MenuItem from "@/components/ui/MenuItem";
import type { MenuItemData } from "@/types/menu";
import { MenuIcons } from "@/lib/icons/Icons";

const meta: Meta<typeof MenuGroup> = {
  title: "Example/MenuGroup",
  component: MenuGroup,
  subcomponents: { MenuItem },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const items: MenuItemData[] = [
  {
    label: "Tasks",
    icon: MenuIcons.tasks,
    onClick: () => alert("Clicked Tasks"),
  },
  {
    label: "Users",
    icon: MenuIcons.users,
    onClick: () => alert("Clicked Users"),
  },
  {
    label: "Portfolio",
    icon: MenuIcons.portfolio,
    href: "https://aledep10.github.io",
  },
];

type Story = StoryObj<typeof MenuGroup>;

export const Example: Story = {
  args: {
    label: "Menu Group",
    items,
  },
};

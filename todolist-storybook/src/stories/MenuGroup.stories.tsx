import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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
  render: () => (
    <MenuTestWrapper>
      {(setContent) => (
        <MenuGroup
          label="Menu Group"
          items={[
            {
              label: "Tasks",
              icon: MenuIcons.tasks,
              onClick: () => setContent("Clicked Tasks"),
            },
            {
              label: "Users",
              icon: MenuIcons.users,
              onClick: () => setContent("Clicked Users"),
            },
            {
              label: "Portfolio",
              icon: MenuIcons.portfolio,
              href: "https://aledep10.github.io",
            },
          ]}
        />
      )}
    </MenuTestWrapper>
  ),
};

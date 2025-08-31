import type { Meta } from "@storybook/react";
import NavBar, { NavBarProps } from "../lib/components/ui/NavBar";
import { MenuTestWrapper } from "./MenuTestWrapper";

const meta: Meta<NavBarProps> = {
  title: "Layout/NavBar",
  component: NavBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = () => (
  <MenuTestWrapper>
    {(setContent) => (
      <NavBar
        menuItems={{
          Functionalities: [
            { label: "Tasks", onClick: () => setContent("Tasks") },
            { label: "Users", onClick: () => setContent("Users") },
          ],
          About: [
            { label: "The author", onClick: () => setContent("Author") },
            {
              label: "Portfolio",
              href: "https://aledep10.github.io"
            },
          ],
        }}
      />
    )}
  </MenuTestWrapper>
);

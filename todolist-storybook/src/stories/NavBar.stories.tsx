import type { Meta } from "@storybook/react";
import { useT } from "../lib/hooks/useTranslation";
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

export const InMainLayoutInteractive = () => {
  const t = useT();

  return (
    <div className="min-h-screen flex flex-col w-[92vw] md:w-[80vw] max-w-[1000px] mx-auto bg-[var(--bg)] text-[var(--fg)]">
      <MenuTestWrapper>
        {(setContent) => (
          <>
            <NavBar
              menuItems={{
                Functionalities: [
                  {
                    label: t("menu.functionalities.tasks"),
                    onClick: () => setContent("Tasks"),
                  },
                  {
                    label: t("menu.functionalities.users"),
                    onClick: () => setContent("Users"),
                  },
                ],
                About: [
                  {
                    label: t("menu.about.onAuthor"),
                    onClick: () => setContent("Author"),
                  },
                  {
                    label: t("menu.about.portfolio"),
                    href: "https://aledep10.github.io",
                  },
                ],
              }}
            />
            <main className="flex-1 p-6">
              <div className="text-sm text-gray-600 italic">
                Content area updates based on menu selection.
              </div>
            </main>
          </>
        )}
      </MenuTestWrapper>
    </div>
  );
};

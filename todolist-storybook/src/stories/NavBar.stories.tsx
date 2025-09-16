import type { Meta, StoryFn } from "@storybook/react";
import { useTranslation } from "../lib/hooks/useTranslation";
import NavBar, { NavBarProps } from "../lib/components/ui/NavBar";
import { MenuTestWrapper } from "./MenuTestWrapper";

const meta: Meta<NavBarProps> = {
  title: "Layout/NavBar",
  component: NavBar,
  parameters: {
    controls: {
      matchers: {
        color: /(background|foreground)Color$/i,
      },
    },
    viewport: {
      defaultViewport: "responsive",
    },
    layout: "centered",
    docs: {
      description: {
        component: `
⚠️ Known issue: The 'Mobile' story renders correctly in the frontend and in the Storybook 'Example' view, but does not behave as expected in the Docs preview.

Symptoms:
- The responsive hook \`useResponsiveVisibility()\` detects a desktop viewport in Docs, even when the preview is resized
- As a result, the button displays both icon and label, instead of icon-only
- This breaks the intended mobile-only behavior

Cause:
- The Docs renderer uses a fixed iframe resolution that does not match the Storybook viewport settings
- Responsive hooks relying on \`window.innerWidth\` or media queries may return inconsistent values

✅ Behavior is correct in 'Example' and in the live application.
✅ The story is valid and does not require changes.
`,
      },
    },
    argTypes: {
      onClick: { action: "clicked" },
      icon: { control: false },
    },
  },
  tags: ["autodocs"],
};

export default meta;

const Layout = () => {
  const t = useTranslation();
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

export const Desktop = () => {
  return <Layout></Layout>;
};

export const Mobile: StoryFn = () => {
  return <Layout></Layout>;
};

Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const Tablet: StoryFn = () => {
  return <Layout></Layout>;
};

Tablet.parameters = {
  viewport: {
    defaultViewport: "tablet",
  },
};

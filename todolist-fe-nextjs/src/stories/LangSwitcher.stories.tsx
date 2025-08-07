import LangSwitcher from "@/components/ui/LangSwitcher";
import { LangProvider } from "@/lib/i18n/LangProvider";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof LangSwitcher> = {
  title: "Example/LangSwitcher",
  component: LangSwitcher,
  decorators: [
    (StoryComponent) => (
      <LangProvider>
        <div style={{ padding: "1rem" }}>
          <StoryComponent />
        </div>
      </LangProvider>
    ),
  ],
  parameters: {
    layout: "centered", // Optional: keeps visual consistency with other components
  },
  tags: ["autodocs"], // ✅ Enables automatic documentation in Docs tab
};

export default meta;

export const Example: StoryObj<typeof LangSwitcher> = {};

import LangSwitcher from "@/components/ui/LangSwitcher";
import { LangProvider } from "@/lib/i18n/LangProvider";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof LangSwitcher> = {
  title: "UI/LangSwitcher",
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
};

export default meta;

export const Default: StoryObj<typeof LangSwitcher> = {};

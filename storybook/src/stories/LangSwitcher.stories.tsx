import { FC } from "react";
import LangSwitcher from "../lib/components/ui/LangSwitcher";
import { LangProvider } from "../lib/providers/i18n";
import { useTranslation } from "../lib/hooks/useTranslation";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof LangSwitcher> = {
  title: "Internationalization/LangSwitcher",
  component: LangSwitcher,
  decorators: [
    ((StoryComponent: FC) => (
      <LangProvider>
        <div style={{ padding: "1rem" }}>
          <StoryComponent />
        </div>
      </LangProvider>
    )) as FC,
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const LangSwitcherExample = () => {
  const t = useTranslation();
  return (
    <div className="space-y-4">
      <LangSwitcher />
      <div className="border p-4 rounded bg-gray-50 text-sm text-gray-700">
        <div>{t("task.management")}</div>
        <div>{t("user.management")}</div>
      </div>
    </div>
  );
};

export const Example: StoryObj<typeof LangSwitcher> = {
  render: () => <LangSwitcherExample />,
};
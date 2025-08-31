import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoadingSpinner, { LoadingSpinnerProps } from "../lib/components/ui/LoadingSpinner";

const meta: Meta<LoadingSpinnerProps> = {
  title: "Feedback/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    size: 64,
    color: "text-yellow-400",
    className: "",
  },
};

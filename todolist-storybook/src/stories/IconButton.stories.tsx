import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "../lib/components/ui/IconButton";
import { Icons } from "../lib/components/Icons";
import { TestWrapper } from "./InteractionSandbox";

const meta: Meta<typeof IconButton> = {
  title: "Controls/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <TestWrapper>
      {(appendText) => (
        <IconButton
          icon={Icons.close}
          ariaLabel="Close"
          color="#047878"
          onClick={() => appendText("Close button clicked")}
        />
      )}
    </TestWrapper>
  ),
};

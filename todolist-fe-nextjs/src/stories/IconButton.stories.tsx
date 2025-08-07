import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "../components/ui/IconButton";
import { Icons } from "@/lib/icons/Icons";

const meta: Meta<typeof IconButton> = {
  title: "Example/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    return (
      <IconButton
        icon={Icons.close}
        color = "#047878"
        onClick={() => alert("pressed")}
      ></IconButton>
    );
  },
};

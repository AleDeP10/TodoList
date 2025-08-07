import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Example/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Example: Story = {
  args: {},
};

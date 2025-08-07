import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Example/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    return (
      <LoadingSpinner />
    );
  },
};

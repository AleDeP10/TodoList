import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Switch from '../components/ui/Switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Example/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Switch
        checked={checked}
        label="Switch"
        onChange={(value) => {
          setChecked(value);
          console.log(`Switch updated to: ${value}`);
        }}
      />
    );
  },
};

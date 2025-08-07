import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TextField from '../components/ui/TextField';
import { useState } from 'react';

const meta: Meta<typeof TextField> = {
  title: 'Example/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <TextField
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          console.log(`TextField updated to: ${value}`);
        }}
      />
    );
  },
};

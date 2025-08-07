import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Dropdown from '../components/ui/Dropdown';
import { useState } from 'react';

const meta: Meta<typeof Dropdown> = {
  title: 'Example/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('Option 1');
    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
      <Dropdown
        value={selectedValue}
        options={options}
        onChange={(newValue) => {
          setSelectedValue(newValue);
          console.log(`Dropdown updated to: ${newValue}`);
        }}
        getOptionValue={(option) => option}
        getOptionLabel={(option) => option}
      />
    );
  },
};
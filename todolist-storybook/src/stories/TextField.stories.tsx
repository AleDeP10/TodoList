import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextField from "../lib/components/ui/TextField";
import { useState } from "react";
import "./sharedInputStyles.css";

const meta: Meta<typeof TextField> = {
  title: "Controls/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const ExampleComponent = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <div className="inputRow">
        <label className="inputLabel">Write something</label>
        <div className="inputField">
          <TextField
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              console.log(`TextField updated to: ${event.target.value}`);
            }}
          />
        </div>
      </div>
      <div className="inputRow">
        <label className="inputLabel">You&#39;ve written</label>
        <div className="outputField">{value}</div>
      </div>
    </>
  );
};

export const Example: Story = {
  render: () => <ExampleComponent />,
};

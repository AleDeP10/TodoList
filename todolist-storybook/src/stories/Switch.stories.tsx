import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Switch from "../lib/components/ui/Switch";
import { useState } from "react";
import "./sharedInputStyles.css";

const meta: Meta<typeof Switch> = {
  title: "Controls/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const ExampleSwitchComponent = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="inputRow">
        <label className="inputLabel">Enable feature</label>
        <div className="inputField">
          <Switch
            checked={checked}
            onChange={setChecked}
            label={checked ? "Enabled" : "Disabled"}
          />
        </div>
      </div>
      <div className="inputRow">
        <label className="inputLabel">Status</label>
        <div className="outputField">{checked ? "Active" : "Inactive"}</div>
      </div>
    </>
  );
};

export const Example: Story = {
  render: () => <ExampleSwitchComponent />,
};

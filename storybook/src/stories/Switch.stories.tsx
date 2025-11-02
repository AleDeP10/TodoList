import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Switch from "../lib/components/ui/Switch";
import { useState } from "react";
import { InteractionSandbox } from "./InteractionSandbox";
import "./sharedOutputStyles.css";

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

export const Grid: Story = {
  name: "Grid Variant",
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [checked, setChecked] = useState(false);

        return (
          <>
            <Switch
              variant="grid"
              checked={checked}
              onChange={(value) => {
                setChecked(value);
                appendText(`Switch toggled to: ${value ? "Admin" : "User"}`);
              }}
              label="Administrator"
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                Role
              </label>
              <div className="col-span-9 outputField">
                {checked ? "Admin" : "User"}
              </div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
};

export const Compact: Story = {
  name: "Compact Variant",
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [checked, setChecked] = useState(false);

        return (
          <>
            <Switch
              variant="compact"
              checked={checked}
              onChange={(value) => {
                setChecked(value);
                appendText(`Switch toggled to: ${value ? "Admin" : "User"}`);
              }}
              label="Administrator"
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                Role
              </label>
              <div className="col-span-9 outputField">
                {checked ? "Admin" : "User"}
              </div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
};

export const MobileView: Story = {
  name: "Grid Variant on Mobile",
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [checked, setChecked] = useState(false);

        return (
          <>
            <Switch
              variant="grid"
              checked={checked}
              onChange={(value) => {
                setChecked(value);
                appendText(`Switch toggled to: ${value ? "Admin" : "User"}`);
              }}
              label="Administrator"
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                Role
              </label>
              <div className="col-span-9 outputField">
                {checked ? "Admin" : "User"}
              </div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: `
⚠️ Known issue: The story does not render correctly in the Docs preview: the Label remains positioned to the left of the Switch, instead of stacking vertically.

Cause:
- The Docs renderer uses a fixed iframe resolution that doesn't match the Storybook viewport settings
- Responsive hook relying on \`window.innerWidth\` returns then inconsistent values

✅ Behavior is correct in 'Example' and in the live application.
      `,
      },
    },
  },
};

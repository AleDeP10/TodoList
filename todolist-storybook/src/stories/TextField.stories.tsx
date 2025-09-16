import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import TextField from "../lib/components/ui/TextField";
import { InteractionSandbox } from "./InteractionSandbox";
import "./sharedOutputStyles.css";

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

export const Example: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [value, setValue] = useState("");

        return (
          <>
            <TextField
              label="Write something"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                appendText(`TextField updated to: ${event.target.value}`);
              }}
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                You’ve written
              </label>
              <div className="col-span-9 outputField">{value}</div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
};

export const MandatoryField: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [value, setValue] = useState("John Doe");

        const isEmpty = value.trim() === "";

        return (
          <>
            <TextField
              label="Full name (required)"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                appendText(`TextField updated to: ${event.target.value}`);
              }}
              error={isEmpty}
              helperText={isEmpty ? "This field is required" : ""}
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                Current value
              </label>
              <div className="col-span-9 outputField">{value}</div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
};

export const Password: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [value, setValue] = useState("");

        const isEmpty = value.trim() === "";

        return (
          <>
            <TextField
              variant="password"
              label="Password"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                appendText(`TextField updated to: ${event.target.value}`);
              }}
              error={isEmpty}
              helperText={isEmpty ? "This field is required" : ""}
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                Current value
              </label>
              <div className="col-span-9 outputField">{value}</div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
};

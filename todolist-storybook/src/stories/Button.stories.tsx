import type { Meta, StoryFn } from "@storybook/react";
import { Icons } from "../lib/components/Icons";
import { Button, ButtonProps } from "../lib/components/ui/Button";
import { TestWrapper } from "./TestWrapper";

const meta: Meta<ButtonProps> = {
  title: "Controls/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|foreground)Color$/i,
      },
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },
  argTypes: {
    onClick: { action: "clicked" },
    icon: { control: false },
  },
};

export default meta;

export const Confirm: StoryFn<ButtonProps> = () => (
  <TestWrapper>
    {(appendText) => (
      <Button
        label="Confirm"
        variant="primary"
        icon={Icons.confirm}
        onClick={() => appendText("Confirm button clicked")}
      />
    )}
  </TestWrapper>
);

export const Cancel: StoryFn<ButtonProps> = () => (
  <TestWrapper>
    {(appendText) => (
      <Button
        label="Cancel"
        variant="secondary"
        icon={Icons.cancel}
        onClick={() => appendText("Cancel button clicked")}
      />
    )}
  </TestWrapper>
);

export const Delete: StoryFn<ButtonProps> = () => (
  <TestWrapper>
    {(appendText) => (
      <Button
        label="Delete"
        variant="danger"
        icon={Icons.delete}
        onClick={() => appendText("Delete button clicked")}
      />
    )}
  </TestWrapper>
);

export const Disabled: StoryFn<ButtonProps> = () => (
  <TestWrapper>
    {(appendText) => (
      <Button
        label="Disabled"
        variant="primary"
        disabled={true}
        onClick={() => appendText("You will never see this!")}
      />
    )}
  </TestWrapper>
);

export const IconOnlyMobile: StoryFn<ButtonProps> = () => (
  <TestWrapper>
    {(appendText) => (
      <Button
        label="Add"
        variant="primary"
        icon={Icons.plus}
        onClick={() => appendText("Add button clicked")}
      />
    )}
  </TestWrapper>
);

IconOnlyMobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const CustomColors: StoryFn<ButtonProps> = () => (
  <TestWrapper>
    {(appendText) => (
      <Button
        label="Custom"
        variant="primary"
        icon={Icons.plus}
        backgroundColor="#222"
        foregroundColor="#0f0"
        onClick={() => appendText("Custom button clicked")}
      />
    )}
  </TestWrapper>
);

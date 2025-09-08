import type { Meta, StoryFn } from "@storybook/react";
import { getCSSVariable } from "../lib/utils/getCSSVariable";
import { Icons } from "../lib/components/Icons";
import { Button, ButtonProps } from "../lib/components/ui/Button";
import { TestWrapper } from "./InteractionSandbox";

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
    layout: "centered",
    docs: {
      description: {
        component: `
⚠️ Known issue: The 'IconOnlyMobile' story renders correctly in the frontend and in the Storybook 'Example' view, but does not behave as expected in the Docs preview.

Symptoms:
- The responsive hook \`useResponsiveVisibility()\` detects a desktop viewport in Docs, even when the preview is resized
- As a result, the button displays both icon and label, instead of icon-only
- This breaks the intended mobile-only behavior

Cause:
- The Docs renderer uses a fixed iframe resolution that does not match the Storybook viewport settings
- Responsive hooks relying on \`window.innerWidth\` or media queries may return inconsistent values

✅ Behavior is correct in 'Example' and in the live application.
✅ The story is valid and does not require changes.
`,
      },
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

export const IconOnly: StoryFn<ButtonProps> = () => (
  <TestWrapper>
    {(appendText) => (
      <Button
        icon={Icons.plus}
        tooltip="Add"
        variant="primary"
        onClick={() => appendText("Add button clicked")}
      />
    )}
  </TestWrapper>
);

export const IconOnlyMobile: StoryFn = () => {
  return (
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
};

IconOnlyMobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const CustomColors: StoryFn<ButtonProps> = () => (
  <TestWrapper>
    {(appendText) => (
      <Button
        label="Create"
        variant="primary"
        icon={Icons.plus}
        backgroundColor={getCSSVariable("--create-bg")}
        foregroundColor="white"
        onClick={() => appendText("Create button clicked")}
      />
    )}
  </TestWrapper>
);

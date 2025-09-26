import type { Meta, StoryFn } from "@storybook/react";
import { StoryObj } from "@storybook/nextjs-vite";
import { getCSSVariable } from "../lib/utils/getCSSVariable";
import { Icons } from "../lib/components/Icons";
import { Button, ButtonProps } from "../lib/components/ui/Button";
import { InteractionSandbox } from "./InteractionSandbox";

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
⚠️ Note: On small screens, buttons automatically suppress the label, leaving it visible only to screen readers. This rule is bypassed for buttons without an icon, which would otherwise appear empty. The 'Disabled' story demonstrates this exception.

✅ Convention: All buttons in the frontend include an icon to ensure consistent rendering across viewports.
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

type Story = StoryObj<typeof meta>;

export const Confirm: StoryFn<ButtonProps> = () => (
  <InteractionSandbox>
    {(appendText) => (
      <Button
        label="Confirm"
        variant="primary"
        icon={Icons.confirm}
        onClick={() => appendText("Confirm button clicked")}
      />
    )}
  </InteractionSandbox>
);

export const Cancel: StoryFn<ButtonProps> = () => (
  <InteractionSandbox>
    {(appendText) => (
      <Button
        label="Cancel"
        variant="secondary"
        icon={Icons.cancel}
        onClick={() => appendText("Cancel button clicked")}
      />
    )}
  </InteractionSandbox>
);

export const Delete: StoryFn<ButtonProps> = () => (
  <InteractionSandbox>
    {(appendText) => (
      <Button
        label="Delete"
        variant="danger"
        icon={Icons.delete}
        onClick={() => appendText("Delete button clicked")}
      />
    )}
  </InteractionSandbox>
);

export const Disabled: StoryFn<ButtonProps> = () => (
  <InteractionSandbox>
    {(appendText) => (
      <Button
        label="Disabled"
        variant="primary"
        disabled={true}
        onClick={() => appendText("You will never see this!")}
      />
    )}
  </InteractionSandbox>
);

export const IconOnly: StoryFn<ButtonProps> = () => (
  <InteractionSandbox>
    {(appendText) => (
      <Button
        icon={Icons.plus}
        tooltip="Add"
        variant="primary"
        onClick={() => appendText("Add button clicked")}
      />
    )}
  </InteractionSandbox>
);

export const CustomColors: StoryFn<ButtonProps> = () => (
  <InteractionSandbox>
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
  </InteractionSandbox>
);

export const MobileView: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => (
        <Button
          label="Add"
          variant="primary"
          icon={Icons.plus}
          onClick={() => appendText("Add button clicked")}
        />
      )}
    </InteractionSandbox>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: `
⚠️ Known issue: The story does not render correctly in the Docs preview: the button displays both icon and label, instead of icon-only.

Cause:
- The Docs renderer uses a fixed iframe resolution that doesn't match the Storybook viewport settings
- Responsive hook relying on \`window.innerWidth\` returns then inconsistent values

✅ Behavior is correct in 'Example' and in the live application.

`,
      },
    },
  },
};

export const TabletView: StoryFn = () => {
  return (
    <InteractionSandbox>
      {(appendText) => (
        <Button
          label="Add"
          variant="primary"
          icon={Icons.plus}
          onClick={() => appendText("Add button clicked")}
        />
      )}
    </InteractionSandbox>
  );
};

TabletView.parameters = {
  viewport: {
    defaultViewport: "tablet",
  },
};

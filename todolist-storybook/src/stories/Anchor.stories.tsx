import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Anchor } from "../lib/components/ui/Anchor";
import { Icons } from "../lib/components/Icons";
import { InteractionSandbox } from "./InteractionSandbox";

const meta: Meta<typeof Anchor> = {
  title: "Controls/Anchor",
  component: Anchor,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `⚠️ Known issue: Anchor links may appear visually incorrect in Storybook's 'Docs' preview and examples.

Symptoms include missing text color, underline, and decoration styles — links are rendered as plain labels without expected Tailwind classes.

✅ The same JSX structure renders correctly in the actual frontend application, confirming that the issue is isolated to Storybook's rendering engine.

✅ Tailwind classes (e.g. text-blue-600, underline-offset-2, decoration-blue-600) are correctly included in the safelist and applied in production.

Verdict: This visual inconsistency has been acknowledged and deprioritized. Please disregard the styling anomaly in Storybook.`,
      },
    },
  },

  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => (
        <Anchor
          href="https://aledep10.github.io"
          external={true}
          underline={true}
        >
          Portfolio
        </Anchor>
      )}
    </InteractionSandbox>
  ),
};

export const WithClick: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => (
        <Anchor onClick={() => appendText("Link clicked")} underline={true}>
          Track click
        </Anchor>
      )}
    </InteractionSandbox>
  ),
};

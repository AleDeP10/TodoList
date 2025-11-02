import { useEffect, useState } from "react";
import { Meta } from "@storybook/react";
import { Icons } from "../lib/components/Icons";
import { Button, ButtonVariant } from "../lib/components/ui/Button";
import Modal, { ModalProps } from "../lib/components/ui/Modal";

const meta: Meta<ModalProps> = {
  title: "Layout/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
⚠️ Known issue: The Modal component renders correctly in the frontend and in the Storybook 'Example' view, but appears visually broken in the Docs preview.

Symptoms:
- Header is cropped or pushed outside the viewport
- Content is horizontally compressed and may require scrolling
- The defined max-width (e.g. 'max-w-lg') is ignored
- CSS variables like '--modal-bg' and '--fg' are present but not resolved
- Modal briefly flashes and disappears due to Framer Motion's AnimatePresence remount behavior

This is a limitation of the Docs renderer and does not affect production usage.

✅ Layout and behavior are correct in 'Example' and in the live application.

✅ To mitigate this in Storybook, the Modal component supports a 'disableAnimation' prop to bypass AnimatePresence when needed.
`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setOpen(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return open ? (
    <Modal
      title="Hello Modal"
      disableAnimation={true}
      onClose={() => setOpen(false)}
      footerActions={[
        {
          label: "OK",
          icon: Icons.confirm,
          variant: "primary" as ButtonVariant,
          onClick: () => setOpen(false),
        },
      ]}
    >
      <p>
        This is a dynamic content added through the React&apos;s children
        property: you may nest inside the modal body any kind of content by
        adding it directly inside the &lt;Modal&gt;&lt;/Modal&gt; JSX.
      </p>
    </Modal>
  ) : (
    <Button
      variant="primary"
      onClick={() => setOpen(true)}
      label="Open modal"
      icon={Icons.open}
    />
  );
};

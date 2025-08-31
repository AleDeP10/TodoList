import { useState } from "react";
import { Meta } from "@storybook/react";
import { Icons } from "../lib/components/Icons";
import { ButtonVariant } from "../lib/components/ui/Button";
import Modal, { ModalProps } from "../lib/components/ui/Modal";

const meta: Meta<ModalProps> = {
  title: "Layout/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = () => {
  const [open, setOpen] = useState(true);

  return open ? (
    <Modal
      title="Hello Modal"
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
    <button
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      onClick={() => setOpen(true)}
    >
      Open modal
    </button>
  );
};

import { ButtonVariant } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Icons } from "@/lib/icons/Icons";
import { useState } from "react";

export default {
  title: "Layout/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Example = () => {
  const [open, setOpen] = useState(true);

  return open ? (
    <Modal
      title="Hello Modal"
      onClose={() => setOpen(false)}
      footerActions={[{
        label: "OK",
        icon: Icons.confirm,
        variant: "primary" as ButtonVariant,
        onClick: () => setOpen(false),
      }]}
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

import Modal from "@/components/ui/Modal";
import { useState } from "react";

export default {
  title: "Layout/Modal",
  component: Modal,
};

export const BasicModal = () => {
  const [open, setOpen] = useState(true);

  return open ? (
    <Modal
      title="Hello Modal"
      onClose={() => setOpen(false)}
      closeHandlers={{
        Confirm: () => {
          console.log("Confirmed!");
          setOpen(false);
        },
        Cancel: () => setOpen(false),
      }}
    >
      <p>
        Questo è un contenuto dinamico. Puoi aggiungere testo, form, link o
        altri componenti.
      </p>
    </Modal>
  ) : (
    <button
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      onClick={() => setOpen(true)}
    >
      Apri Modal
    </button>
  );
};

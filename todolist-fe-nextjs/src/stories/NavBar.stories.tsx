import { useState } from "react";
import Modal from "../components/ui/Modal";
import NavBar from "../components/ui/NavBar";

export default {
  title: "UI/NavBar",
  component: NavBar,
};

export const Default = () => (
  <NavBar
    menuItems={{
      Functionalities: [
        { label: "Tasks", onClick: () => alert("Tasks") },
        { label: "Users", onClick: () => alert("Users") },
      ],
      About: [
        { label: "The author", onClick: () => alert("Author") },
        { label: "Portfolio", href: "/portfolio" },
      ],
    }}
  />
);

export const AboutAuthorModal = () => {
  const [open, setOpen] = useState(true);

  return open ? (
    <Modal
      title="About • Alessandro De Prato"
      onClose={() => setOpen(false)}
      footerActions={[
        {
          label: "Cancel",
          onClick: () => setOpen(false),
        },
      ]}
    >
      <div>
        <h3 className="font-semibold text-base mb-2">Profile</h3>
        <p className="text-sm leading-relaxed">
          Sviluppatore full-stack con esperienza in architetture moderne, UI
          avanzate e progettazione di componenti scalabili. Appassionato di
          TypeScript, React/Next.js e soluzioni dinamiche ottimizzate per
          performance e accessibilità.
        </p>
      </div>
    </Modal>
  ) : (
    <button
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      onClick={() => setOpen(true)}
    >
      Autore
    </button>
  );
};

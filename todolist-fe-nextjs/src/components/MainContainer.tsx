"use client";

import { useState } from "react";
import { MenuIcons } from "@/lib/icons/Icons";
import NavBar from "@/components/ui/NavBar";
import Modal from "@/components/ui/Modal";
import { useT } from "@/hooks/useTranslation";
import { useView } from "@/hooks/useView";
import UsersView from "@/components/views/UsersView";

export default function MainContainer() {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const t = useT();
  const { view, setView } = useView();

  const menuItems = {
    Functionalities: [
      {
        label: t("menu.functionalities.tasks"),
        icon: MenuIcons.tasks,
        onClick: () => setView("tasks"),
      },
      {
        label: t("menu.functionalities.users"),
        icon: MenuIcons.users,
        onClick: () => setView("users"),
      },
    ],
    About: [
      {
        label: t("menu.about.onAuthor"),
        icon: MenuIcons.author,
        onClick: () => setShowAboutModal(true),
      },
      {
        label: t("menu.about.portfolio"),
        icon: MenuIcons.portfolio,
        href: "/portfolio",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <NavBar menuItems={menuItems} />

      {showAboutModal && (
        <Modal
          title="About • Alessandro De Prato"
          onClose={() => setShowAboutModal(false)}
          footerActions={[
            {
              label: t("button.cancel"),
              onClick: () => setShowAboutModal(false),
            },
          ]}
        >
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold text-base">Profile</h3>
            <p>
              Sviluppatore full-stack con attenzione alla UI moderna,
              architetture modulari e TypeScript evoluto.
            </p>
          </div>
        </Modal>
      )}

      <main className="flex-1 p-6">
        {view === "users" && <UsersView />}
        {view === "tasks" && <p>Task view placeholder</p>}
      </main>
    </div>
  );
}

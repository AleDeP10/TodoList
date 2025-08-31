"use client";

import { useState } from "react";
import { useT } from "@/lib/hooks/useTranslation";
import { useView } from "@/lib/hooks/useView";
import { MenuIcons } from "@/lib/components/Icons";
import NavBar from "@/lib/components/ui/NavBar";
import UsersView from "@/components/views/UsersView";
import TasksView from "./views/TasksView";
import AboutAuthorModal from "./modals/AboutAuthorModal";

export default function MainContainer() {
  const [showOnAuthorModal, setShowOnAuthorModal] = useState(false);
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
        onClick: () => setShowOnAuthorModal(true),
      },
      {
        label: t("menu.about.portfolio"),
        icon: MenuIcons.portfolio,
        href: "https://AleDeP10.github.io/",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col w-[92vw] md:w-[80vw] max-w-[1000px] mx-auto bg-[var(--bg)] text-[var(--fg)]">
      <NavBar menuItems={menuItems} />

      <main className="flex-1 p-6">
        {view === "users" && <UsersView />}
        {view === "tasks" && <TasksView />}
      </main>
      
      {/* About author modal */}
      {showOnAuthorModal && (
        <AboutAuthorModal onClose={() => setShowOnAuthorModal(false)} />
      )}
    </div>
  );
}

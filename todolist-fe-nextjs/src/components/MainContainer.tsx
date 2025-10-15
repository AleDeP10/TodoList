"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeName } from "@/lib/types/ThemeName";
import { useTheme } from "@/lib/hooks/useTheme";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useView } from "@/lib/hooks/useView";
import { MenuIcons } from "@/lib/components/Icons";
import NavBar from "@/lib/components/ui/NavBar";
import { showToast } from "@/store/ui/uiSlice";
import { getLoadedFirstTime } from "@/store/ui/getLoadedFirstTime";
import DashboardView from "@/components/views/DashboardView";
import UsersView from "./views/UsersView";
import TasksView from "./views/TasksView";
import AboutAuthorModal from "./modals/AboutAuthorModal";
import ManualModal from "./modals/ManualModal";
import Footer from "./Footer";

export default function MainContainer() {
  const dispatch = useDispatch();
  const t = useTranslation();
  const { view, setView } = useView();
  const [, setTheme] = useTheme();
  const loadedFirstTime = useSelector(getLoadedFirstTime);

  const [showManualModal, setShowManualModal] = useState(false);
  const [showOnAuthorModal, setShowOnAuthorModal] = useState(false);

  const menuItems = {
    Functionalities: [
      {
        label: t("menu.functionalities.dashboard"),
        icon: MenuIcons.dashboard,
        onClick: () => setView("dashboard"),
      },
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
        label: t("menu.about.manual"),
        icon: MenuIcons.manual,
        onClick: () => setShowManualModal(true),
      },
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

  useEffect(() => {
    if (!loadedFirstTime) {
      setTheme((localStorage.getItem("theme") || "skyline") as ThemeName);
      dispatch(
        showToast({
          type: "startup",
          message: t("toast.startup"),
        })
      );
    }
  });

  return (
    <div className="relative min-h-screen flex flex-col w-[92vw] md:w-[80vw] max-w-[1000px] mx-auto bg-[var(--bg)] text-[var(--fg)] overflow-visible">
      <NavBar menuItems={menuItems} />

      <main className="flex-1 p-6">
        {view === "dashboard" && <DashboardView />}
        {view === "users" && <UsersView />}
        {view === "tasks" && <TasksView />}
      </main>

      {/* Footer links */}
      <div className="mb-8"></div>
      <Footer></Footer>

      {/* Manual modal */}
      {showManualModal && (
        <ManualModal onClose={() => setShowManualModal(false)} />
      )}

      {/* About author modal */}
      {showOnAuthorModal && (
        <AboutAuthorModal onClose={() => setShowOnAuthorModal(false)} />
      )}
    </div>
  );
}

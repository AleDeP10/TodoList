import React, { useState } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useView } from "@/lib/hooks/useView";
import { Anchor } from "@/lib/components/ui/Anchor";
import ManualModal from "./modals/ManualModal";

const Footer = () => {
  const t = useTranslation();
  const { view, setView } = useView();

  const [showManualModal, setShowManualModal] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 w-full border-t bg-gradient-to-r from-[var(--navbar-start)] to-[var(--navbar-end)] overflow-visible">
      <div className="grid grid-cols-12 items-center py-4 w-full">
        <div className="col-span-4 text-left">
          <Anchor
            className="px-6"
            onClick={() => {
              setView(view === "tasks" ? "dashboard" : "tasks");
            }}
          >
            {t(view === "tasks" ? "footer.dashboard" : "footer.tasks")}
          </Anchor>
        </div>
        <div className="col-span-4 text-center">
          <Anchor
            onClick={() => {
              setView(view === "users" ? "dashboard" : "users");
            }}
          >
            {t(view === "users" ? "footer.dashboard" : "footer.users")}
          </Anchor>
        </div>
        <div className="col-span-4 text-right">
          <Anchor
            className="px-6"
            onClick={() => {
              setShowManualModal(true);
            }}
          >
            {t("footer.manual")}
          </Anchor>
        </div>
      </div>
      {/* Manual modal */}
      {showManualModal && (
        <ManualModal onClose={() => setShowManualModal(false)} />
      )}
    </div>
  );
};

export default Footer;

"use client";

import { createContext, useContext, useState } from "react";

export type ViewType = "home" | "tasks" | "users";

const ViewContext = createContext<
  | {
      view: ViewType;
      setView: (view: ViewType) => void;
    }
  | undefined
>(undefined);

export function ViewProvider({ children }: { children?: React.ReactNode }) {
  const [view, setView] = useState<ViewType>("home");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView must be used within ViewProvider");
  return ctx;
}

import { useContext } from "react";
import { ViewContext } from "../providers/view";

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('useView must be used within ViewProvider');
  return ctx;
}

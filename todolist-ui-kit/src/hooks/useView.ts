/**
 * useView.ts
 *
 * 🧭 Context:
 * This hook provides access to the current view context, enabling shared state across layout and navigation components.
 * It is intended to be used within the `ViewProvider` wrapper.
 *
 * ✅ Solves:
 * - Centralized view state management
 * - Avoids prop drilling for layout-related data
 * - Enables dynamic rendering based on view context
 *
 * ⚙️ Behavior:
 * - Internally uses `useContext(ViewContext)`
 * - Throws if used outside of `ViewProvider`
 * - Returns the full context object
 *
 * 📦 Usage:
 * ```tsx
 * const { currentView, setView } = useView();
 * ```
 */

import { useContext } from "react";
import { ViewContext } from "../../../todolist-ui-kit/src/providers/view";

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('useView must be used within ViewProvider');
  return ctx;
}

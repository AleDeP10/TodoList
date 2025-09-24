'use client';

import { createContext, useState } from 'react';

export type ViewType = 'home' | 'tasks' | 'users';

export const ViewContext = createContext<{
  view: ViewType;
  setView: (view: ViewType) => void;
} | undefined>(undefined);

export function ViewProvider({ children }: { children?: React.ReactNode }) {
  const [view, setView] = useState<ViewType>('home');

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}
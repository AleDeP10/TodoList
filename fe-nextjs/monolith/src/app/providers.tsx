"use client";

import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { store } from "@/store/store";
import { LangProvider } from "@/lib/providers";
import { ViewProvider } from "@/lib/providers";
import ToastManager from "@/components/feedback/ToastManager";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LangProvider>
          <ViewProvider>
            {children}
            <ToastManager />
          </ViewProvider>
        </LangProvider>
      </QueryClientProvider>
    </Provider>
  );
}

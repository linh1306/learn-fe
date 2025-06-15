"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "@/store";
import { ModalProvider } from "@/hooks/useAppModal.hook";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{children}</ModalProvider>
        <Toaster
          position="top-right"
          theme="light"
          duration={3000}
          richColors
          closeButton
          expand
        />
      </QueryClientProvider>
    </Provider>
  );
}

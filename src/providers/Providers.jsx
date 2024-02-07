"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Providers({ children }) {
  const query = new QueryClient();

  return (
    <QueryClientProvider client={query}>
      <SessionProvider >
        {children}
        </SessionProvider>
    </QueryClientProvider>
  );
}

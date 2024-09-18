"use client";
import React, { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "@/lib/queryClient";

function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;

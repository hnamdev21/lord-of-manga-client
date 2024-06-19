"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Providers;

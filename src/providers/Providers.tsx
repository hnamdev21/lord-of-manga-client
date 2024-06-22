"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
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
        <AntdRegistry>
          <StyleProvider hashPriority="low">
            <ThemeProvider>{children}</ThemeProvider>
          </StyleProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Providers;

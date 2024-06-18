"use client";

import React from "react";

import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;

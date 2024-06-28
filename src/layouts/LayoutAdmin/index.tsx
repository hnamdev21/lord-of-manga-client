"use client";

import React from "react";

import AdminThemeProvider from "@/providers/AdminThemeProvider";
import { AuthContext } from "@/providers/AuthProvider";

import Sidebar from "./Sidebar";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const authContext = React.use(AuthContext);

  if (!authContext?.user) return null;

  return (
    <AdminThemeProvider>
      <Sidebar />

      <div className="min-h-screen flex flex-col justify-between bg-[var(--color-light)] text-[var(--color-black)]">
        <main className="flex-1 w-full overflow-hidden mx-auto">{children}</main>
      </div>
    </AdminThemeProvider>
  );
};

export default LayoutAdmin;

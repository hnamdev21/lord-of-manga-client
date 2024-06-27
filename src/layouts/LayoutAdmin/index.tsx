import React from "react";

import AdminThemeProvider from "@/providers/AdminThemeProvider";

import Sidebar from "./Sidebar";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminThemeProvider>
      <Sidebar />

      <div className="min-h-screen flex flex-col justify-between">
        <main className="flex-1 w-full overflow-hidden mx-auto">{children}</main>
      </div>
    </AdminThemeProvider>
  );
};

export default LayoutAdmin;

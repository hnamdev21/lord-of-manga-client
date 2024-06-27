import "./app.scss";

import React from "react";

import AdminThemeProvider from "@/providers/AdminThemeProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminThemeProvider>{children}</AdminThemeProvider>;
}

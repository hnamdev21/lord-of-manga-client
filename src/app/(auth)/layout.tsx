import React from "react";

import UserThemeProvider from "@/providers/UserThemeProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UserThemeProvider>{children}</UserThemeProvider>;
}

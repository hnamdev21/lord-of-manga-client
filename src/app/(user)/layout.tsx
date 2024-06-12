import React from "react";

import LayoutUser from "@/layouts/LayoutUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutUser>{children}</LayoutUser>;
}

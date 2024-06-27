import "./app.scss";

import React from "react";

import LayoutAdmin from "@/layouts/LayoutAdmin";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutAdmin>{children}</LayoutAdmin>;
}

import React from "react";

import UserThemeProvider from "@/providers/UserThemeProvider";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserThemeProvider>
      <Sidebar />

      <div className="min-h-screen flex flex-col justify-between">
        <Header />

        <main className="flex-1 w-full overflow-hidden mx-auto">{children}</main>

        <Footer />
      </div>
    </UserThemeProvider>
  );
};

export default LayoutUser;

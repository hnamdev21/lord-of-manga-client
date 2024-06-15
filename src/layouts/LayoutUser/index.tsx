import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Sidebar />

      <div className="min-h-screen flex flex-col justify-between">
        <Header />

        <main className="flex-1 w-full overflow-hidden max-w-8xl mx-auto">{children}</main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default LayoutUser;

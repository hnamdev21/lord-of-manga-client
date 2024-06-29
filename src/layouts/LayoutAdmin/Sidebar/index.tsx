"use client";

import React from "react";

import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import { SidebarAdminPath, SidebarCommonPath } from "@/constants/sidebar";
import { AuthContext } from "@/providers/AuthProvider";

import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const authContext = React.use(AuthContext);

  return (
    <div
      className="p-[1rem] h-screen w-[5.2rem] hover:w-96 transition-all ease-in-out duration-300"
      style={{
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="w-full h-[4.2rem] pb-[1rem] mb-[4rem] flex justify-center">
        <Logo />
      </div>

      {/* General Menu */}
      <Typography tag="h6" fontSize="xs" fontWeight="bold" align="center" className="w-full mb-[.5rem]">
        Main
      </Typography>
      <div className="w-full flex flex-col gap-[1rem] mb-[2rem]">
        <SidebarItem {...SidebarCommonPath.HOME} />
      </div>

      {/* Admin Menu */}
      {authContext?.user?.roles.find((role) => role.name === "ADMIN") && (
        <React.Fragment>
          <Typography tag="h6" fontSize="xs" fontWeight="bold" align="center" className="w-full mb-[.5rem]">
            Admin
          </Typography>

          <div className="w-full flex flex-col gap-[1rem]">
            {Object.entries(SidebarAdminPath).map(([key, value]) => (
              <SidebarItem key={key} {...value} />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Sidebar;

"use client";

import Link from "next/link";
import React from "react";
import { FaWolfPackBattalion } from "react-icons/fa";

import Typography from "@/components/Typography";
import Path from "@/constants/path";
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
        <Link href={Path.USER.HOME} className="h-full aspect-square w-auto hover:text-red-500 transition ease-in-out duration-300 text-[var(--color-black)]">
          <FaWolfPackBattalion className="h-full aspect-square w-auto" />
        </Link>
      </div>

      {/* General Menu */}
      <Typography tag="h6" fontSize="xs" fontWeight="bold" align="center" className="w-full mb-[.5rem]" textColor="black">
        Main
      </Typography>
      <div className="w-full flex flex-col gap-[1rem] mb-[2rem]">
        <SidebarItem {...SidebarCommonPath.HOME} />
      </div>

      {/* Admin Menu */}
      {authContext?.user?.roles.find((role) => role.name === "ADMIN") && (
        <React.Fragment>
          <Typography tag="h6" fontSize="xs" fontWeight="bold" align="center" className="w-full mb-[.5rem]" textColor="black">
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

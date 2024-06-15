"use client";

import { Divider } from "antd";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import SidebarPath from "@/constants/sidebar";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div
      className="fixed top-0 left-0 z-20 p-[1rem] h-screen w-24 hover:w-96 transition-all ease-in-out duration-300 bg-[var(--color-dark)]"
      style={{
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.9)",
      }}
    >
      <div className="mt-[1rem] mb-[4rem] w-full h-[4rem] flex justify-center">
        <Logo />
      </div>

      <Divider />

      <div className="w-full flex flex-col gap-[1rem]">
        {Object.entries(SidebarPath).map(([key, value]) => {
          const routes = pathname.split("/");
          const active = routes[1].toLowerCase() === value.href.split("/")[1].toLowerCase();

          return (
            <Link
              key={key}
              href={value.href}
              className={cn("w-full h-[4rem] p-[1rem] rounded-xl hover:brightness-50 transition ease-in-out duration-300 bg-[var(--color-dark-gray)]", {
                "bg-[var(--color-primary)]": active,
              })}
            >
              <span className="flex items-center overflow-hidden gap-[2rem] w-full h-[2rem]">
                <value.icon className="flex-none" />{" "}
                <Typography tag="span" className="flex-none">
                  {value.label}
                </Typography>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

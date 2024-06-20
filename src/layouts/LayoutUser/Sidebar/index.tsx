"use client";

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
      className="fixed top-0 left-0 z-30 p-[1rem] h-screen w-[5.2rem] hover:w-96 transition-all ease-in-out duration-300 bg-[var(--color-dark)]"
      style={{
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.9)",
      }}
    >
      <div className="w-full h-[4.2rem] pb-[1rem] mb-[4rem] flex justify-center">
        <Logo />
      </div>

      <div className="w-full flex flex-col gap-[1rem]">
        {Object.entries(SidebarPath).map(([key, value]) => {
          const routes = pathname.split("/");
          const active = routes[1].toLowerCase() === value.href.split("/")[1].toLowerCase();

          return (
            <Link
              key={key}
              href={value.href}
              className={cn(
                "w-full h-[3.2rem] p-[.9rem] flex-items center rounded-xl hover:brightness-50 transition ease-in-out duration-300 bg-[var(--color-dark-gray)] overflow-hidden",
                {
                  "bg-[var(--color-primary)]": active,
                }
              )}
            >
              <span className="flex items-center gap-[1rem] w-full h-[1.4rem]">
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

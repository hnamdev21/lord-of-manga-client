import { Divider } from "antd";
import cn from "classnames";
import Link from "next/link";
import React from "react";
import { FaWolfPackBattalion } from "react-icons/fa";

import Typography from "@/components/Typography";
import Path from "@/constants/path";
import SidebarPath from "@/constants/sidebar";

const Sidebar = () => {
  return (
    <div
      className={cn("fixed top-0 left-0 z-10 p-[1rem] h-screen w-24 hover:w-96", {})}
      style={{
        backgroundColor: "var(--color-dark)",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.9)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="mt-[1rem] mb-[4rem] w-full h-[4rem] rounded-xl cursor-pointer flex justify-center">
        <Link href={Path.USER.HOME} className="h-full w-[4rem]">
          <FaWolfPackBattalion className="h-full w-[4rem]" />
        </Link>
      </div>

      <Divider />

      <div className="w-full flex flex-col gap-[1rem]">
        {Object.entries(SidebarPath).map(([key, value]) => (
          <Link
            key={key}
            href={value.href}
            className="w-full h-[4rem] p-[1rem] rounded-xl hover:brightness-50 transition ease-in-out duration-300"
            style={{
              backgroundColor: "var(--color-dark-gray)",
            }}
          >
            <span className="flex items-center overflow-hidden gap-[2rem] w-full h-[2rem]">
              <value.icon className="flex-none" />{" "}
              <Typography tag="span" className="flex-none">
                {value.label}
              </Typography>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

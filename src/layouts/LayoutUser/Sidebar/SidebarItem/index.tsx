import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import Typography from "@/components/Typography";
import { type SidebarItem } from "@/constants/sidebar";

const SidebarItem = (item: SidebarItem) => {
  const pathname = usePathname();
  const routes = pathname.split("/");
  const active = routes[1].toLowerCase() === item.href.split("/")[1].toLowerCase();

  return (
    <Link
      href={item.href}
      className={cn(
        "w-full h-[3.2rem] p-[.9rem] flex-items center rounded-xl hover:brightness-50 transition ease-in-out duration-300 bg-[var(--color-dark-gray)] overflow-hidden",
        {
          "bg-[var(--color-primary)]": active,
        }
      )}
    >
      <span className="flex items-center gap-[1rem] w-full h-[1.4rem]">
        <item.icon className="flex-none" />{" "}
        <Typography tag="span" className="flex-none">
          {item.label}
        </Typography>
      </span>
    </Link>
  );
};

export default SidebarItem;

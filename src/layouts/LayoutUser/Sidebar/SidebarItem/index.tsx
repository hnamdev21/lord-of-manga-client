import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import Typography from "@/components/Typography";
import { type SidebarItem } from "@/constants/sidebar";

import styles from "./styles.module.scss";

const SidebarItem = (item: SidebarItem) => {
  const pathname = usePathname();
  const routes = pathname.split("/");
  const active = item.href.split("/").every((path, index) => path === routes[index]);

  return (
    <Link
      href={item.href}
      className={cn(styles.link, {
        [styles.link__active]: active,
      })}
    >
      <span className="flex items-center gap-[1rem] w-full h-[1.4rem]">
        <item.icon className="flex-none" />{" "}
        <Typography tag="span" className="flex-none" textColor={active ? "light" : "black"}>
          {item.label}
        </Typography>
      </span>
    </Link>
  );
};

export default SidebarItem;

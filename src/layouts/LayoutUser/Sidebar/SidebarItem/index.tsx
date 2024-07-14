import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import Typography from "@/components/Typography";
import { type SidebarItem } from "@/constants/sidebar";
import { AuthContext } from "@/providers/AuthProvider";
import { isUserHavePermission, isUserHaveRole } from "@/types/data";

import styles from "./styles.module.scss";

const SidebarItem = (item: SidebarItem) => {
  const authContext = React.use(AuthContext);
  const isAvailable =
    (item.availablePermissions.length === 0 && item.availableRoles.length === 0) ||
    item.availablePermissions.some((permission) => authContext?.user && isUserHavePermission(authContext?.user, permission)) ||
    item.availableRoles.some((role) => authContext?.user && isUserHaveRole(authContext?.user, role));

  const pathname = usePathname();
  const routes = pathname.split("/");
  const active = item.href.split("/").every((path, index) => path === routes[index]);

  if (!isAvailable) {
    return null;
  }

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

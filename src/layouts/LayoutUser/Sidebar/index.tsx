"use client";

import React from "react";

import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import { SidebarAdminPath, SidebarAuthenticatedPath, SidebarCommonPath } from "@/constants/sidebar";
import { AuthContext } from "@/providers/AuthProvider";

import SidebarItem from "./SidebarItem";
import styles from "./styles.module.scss";

const Sidebar = () => {
  const authContext = React.use(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>

      {/* General Menu */}
      <Typography tag="h6" fontSize="xs" fontWeight="bold" align="center" className={styles.title}>
        Main
      </Typography>
      <div className={styles.menu}>
        {Object.entries(SidebarCommonPath).map(([key, value]) => (
          <SidebarItem key={key} {...value} />
        ))}
      </div>

      {/* Authenticated Menu */}
      {authContext?.user && (
        <React.Fragment>
          <Typography tag="h6" fontSize="xs" fontWeight="bold" align="center" className={styles.title}>
            User
          </Typography>

          <div className={styles.menu}>
            {Object.entries(SidebarAuthenticatedPath).map(([key, value]) => (
              <SidebarItem key={key} {...value} />
            ))}
          </div>

          {/* Admin Menu */}
          {authContext.user.roles.find((role) => role.name === "ADMIN") && (
            <React.Fragment>
              <Typography tag="h6" fontSize="xs" fontWeight="bold" align="center" className={styles.title}>
                Admin
              </Typography>

              <div className={styles.menu}>
                {Object.entries(SidebarAdminPath).map(([key, value]) => (
                  <SidebarItem key={key} {...value} />
                ))}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Sidebar;

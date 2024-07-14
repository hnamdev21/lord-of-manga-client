"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import Typography from "@/components/Typography";
import AdminThemeProvider from "@/providers/AdminThemeProvider";
import { AuthContext } from "@/providers/AuthProvider";

import Sidebar from "./Sidebar";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const authContext = React.use(AuthContext);
  const pathname = usePathname();

  const breadcrumbItems = pathname
    .slice(1)
    .split("/")
    .map((path) => ({
      href: pathname.replace(new RegExp(`/${path}.*`), `/${path}`),
      title: (path.charAt(0).toUpperCase() + path.slice(1)).replace(/-/g, " "),
    }));

  if (!authContext?.user) return null;

  return (
    <AdminThemeProvider>
      <main className="h-screen flex gap-[2rem]">
        <Sidebar />
        <div className="flex-1 py-[1rem] h-full pr-[2rem] flex flex-col gap-[1rem]">
          <div className="h-[4rem] w-full"></div>

          <section
            className="flex-1 h-full w-full p-[2rem] rounded-[.8rem] flex flex-col gap-[1rem]"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 20px",
            }}
          >
            <div className="w-full">
              {breadcrumbItems.map((item) => (
                <React.Fragment key={item.href}>
                  <Link href={item.href}>
                    <Typography tag="span" textColor={breadcrumbItems.indexOf(item) < breadcrumbItems.length - 1 ? "black" : "primary"}>
                      {item.title}
                    </Typography>
                  </Link>

                  {breadcrumbItems.indexOf(item) < breadcrumbItems.length - 1 && (
                    <Typography tag="span" className="mx-[1rem]">
                      /
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="w-full flex-1 overflow-y-auto">{children}</div>
          </section>
        </div>
      </main>
    </AdminThemeProvider>
  );
};

export default LayoutAdmin;

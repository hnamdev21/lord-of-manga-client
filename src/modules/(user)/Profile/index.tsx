"use client";

import cn from "classnames";
import React from "react";

import Container from "@/components/Container";
import { AuthContext } from "@/providers/AuthProvider";

import BasicInformationProfile from "./BasicInformationProfile";
import EmailProfile from "./EmailProfile";
import PasswordProfile from "./PasswordProfile";

type ActiveTab = "PROFILE" | "EMAIL" | "PASSWORD";

const ProfileModule = () => {
  const authContext = React.use(AuthContext);

  if (!authContext?.user) return null;

  const [activeTab, setActiveTab] = React.useState<ActiveTab>("PROFILE");
  const tabs: Record<
    ActiveTab,
    {
      title: string;
      content: React.ReactNode;
    }
  > = React.useMemo(
    () =>
      authContext.user && authContext.auth.token
        ? {
            PROFILE: {
              title: "Profile",
              content: <BasicInformationProfile user={authContext.user} token={authContext.auth.token} />,
            },
            EMAIL: { title: "Email", content: <EmailProfile user={authContext.user} token={authContext.auth.token} /> },
            PASSWORD: {
              title: "Password",
              content: <PasswordProfile user={authContext.user} token={authContext.auth.token} />,
            },
          }
        : {
            PROFILE: { title: "Profile", content: null },
            EMAIL: { title: "Email", content: null },
            PASSWORD: { title: "Password", content: null },
          },
    [authContext.user, authContext.auth.token]
  );

  return (
    <Container className="flex-1 pt-[4rem]">
      <div className="col-start-2 col-span-1 flex flex-col">
        {Object.entries(tabs).map(([key, { title }]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as ActiveTab)}
            className={cn("py-[1rem] px-[1.5rem] border-r-[1px] border-solid text-right transition duration-300 ease-in-out hover:brightness-90", {
              "border-[var(--color-primary)]": activeTab === key,
            })}
          >
            {title}
          </button>
        ))}
      </div>

      {authContext.user && <div className="col-span-10">{tabs[activeTab].content}</div>}
    </Container>
  );
};

export default ProfileModule;

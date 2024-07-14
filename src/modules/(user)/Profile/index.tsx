"use client";

import cn from "classnames";
import React from "react";
import { FaAt, FaIdCard, FaLock } from "react-icons/fa";

import Container from "@/components/Container";
import { AuthContext } from "@/providers/AuthProvider";

import BasicInformationProfile from "./BasicInformationProfile";
import EmailProfile from "./EmailProfile";
import PasswordProfile from "./PasswordProfile";
import styles from "./styles.module.scss";

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
      icon: React.ReactNode;
    }
  > = React.useMemo(
    () =>
      authContext.user && authContext.auth.token
        ? {
            PROFILE: {
              title: "Profile",
              content: <BasicInformationProfile user={authContext.user} token={authContext.auth.token} />,
              icon: <FaIdCard />,
            },
            EMAIL: { title: "Email", content: <EmailProfile user={authContext.user} token={authContext.auth.token} />, icon: <FaAt /> },
            PASSWORD: {
              title: "Password",
              content: <PasswordProfile user={authContext.user} token={authContext.auth.token} />,
              icon: <FaLock />,
            },
          }
        : {
            PROFILE: { title: "Profile", content: null, icon: null },
            EMAIL: { title: "Email", content: null, icon: null },
            PASSWORD: { title: "Password", content: null, icon: null },
          },
    [authContext.user, authContext.auth.token]
  );

  return (
    <Container className="flex-1 pt-[4rem]">
      <div className="col-start-2 col-span-1 flex flex-col">
        {Object.entries(tabs).map(([key, { title, icon }]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as ActiveTab)}
            className={cn(styles.button, {
              [styles.button__active]: activeTab === key,
            })}
          >
            {title} {icon}
          </button>
        ))}
      </div>

      {authContext.user && <div className="col-span-10">{tabs[activeTab].content}</div>}
    </Container>
  );
};

export default ProfileModule;

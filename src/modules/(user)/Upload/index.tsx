"use client";

import { Tabs, type TabsProps } from "antd";
import React from "react";

import Container from "@/components/Container";
import { AuthContext } from "@/providers/AuthProvider";

import styles from "./styles.module.scss";
import UploadChapter from "./UploadChapter";
import UploadComic from "./UploadComic";

const UploadModule = () => {
  const authContext = React.use(AuthContext);

  React.useEffect(() => {
    authContext?.goToSignInIfNotAuthenticated();
  }, [authContext?.user]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Upload comic",
      children: <UploadComic />,
    },
    {
      key: "2",
      label: "Upload chapter",
      children: <UploadChapter />,
    },
  ];

  return (
    <Container noGrid className="mb-[4rem]">
      <Tabs defaultActiveKey="1" size="large" centered items={items} className={styles.tabs} />
    </Container>
  );
};

export default UploadModule;

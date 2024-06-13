import { Tabs, type TabsProps } from "antd";
import React from "react";

import Container from "@/components/Container";

import styles from "./styles.module.scss";
import UploadChapter from "./UploadChapter";
import UploadComic from "./UploadComic";

const UploadModule = () => {
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
    <Container noGrid>
      <Tabs defaultActiveKey="1" size="large" centered items={items} className={styles.tabs} />
    </Container>
  );
};

export default UploadModule;

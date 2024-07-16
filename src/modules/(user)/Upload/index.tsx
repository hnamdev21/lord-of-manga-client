"use client";

import { Tabs, type TabsProps } from "antd";
import React from "react";

import Container from "@/components/Container";
import { AuthContext } from "@/providers/AuthProvider";
import { ComicAPI } from "@/services/apis/comic";
import { Comic } from "@/types/data";

import UploadChapter from "./UploadChapter";
import UploadComic from "./UploadComic";

const UploadModule = () => {
  const authContext = React.use(AuthContext);

  const [createdComics, setCreatedComics] = React.useState<Comic[]>([]);

  if (!authContext) return null;

  const fetchCreatedComics = async () => {
    const response = await ComicAPI.getAllMyComics({
      token: authContext.auth.token,
      params: {
        all: true,
      },
    });

    setCreatedComics(response.data.content);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Upload comic",
      children: <UploadComic />,
    },
    {
      key: "2",
      label: "Upload chapter",
      children: <UploadChapter createdComics={createdComics} />,
    },
  ];

  return (
    <Container noGrid className="mb-[4rem]">
      <Tabs
        defaultActiveKey="1"
        size="large"
        centered
        items={items}
        onChange={(key) => {
          if (key === "2") {
            fetchCreatedComics();
          }
        }}
      />
    </Container>
  );
};

export default UploadModule;

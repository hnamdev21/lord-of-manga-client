"use client";

import { Tabs, type TabsProps } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Container from "@/components/Container";
import { AuthContext } from "@/providers/AuthProvider";
import { Comic } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import UploadChapter from "./UploadChapter";
import UploadComic from "./UploadComic";

const UploadModule = () => {
  const authContext = React.use(AuthContext);

  const [createdComics, setCreatedComics] = React.useState<Comic[]>([]);

  const fetchCreatedComics = async () => {
    const { data } = (
      await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>(`/comics/mine?all=true`, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    setCreatedComics(data.content);
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

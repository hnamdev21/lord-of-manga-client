"use client";

import { Divider } from "antd";
import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";
import { BaseResponse } from "@/types/response";

import ReadingHistoryCard from "./components/ReadingHistoryCard";

const ReadingHistoryModule = () => {
  const lastRead = JSON.parse(localStorage.getItem("lastRead") || "{}");
  const [comics, setComics] = React.useState<Comic[]>([]);

  useQuery(["readingHistory"], async () => {
    const slugs = Object.keys(lastRead);
    const { data } = (
      await AXIOS_INSTANCE.post<BaseResponse<Comic[]>>("/comics/slugs", {
        slugs,
      })
    ).data;
    setComics(data);

    return data;
  });

  const onClickRemove = (comic: Comic) => {
    const lastRead = JSON.parse(localStorage.getItem("lastRead") || "{}");
    delete lastRead[comic.slug];
    setComics(comics.filter((c) => c.slug !== comic.slug));
    localStorage.setItem("lastRead", JSON.stringify(lastRead));
  };

  return (
    <Container noGrid className="mb-[4rem]">
      <Typography tag="h1" fontSize="2xl" align="center">
        Reading History
      </Typography>

      <Divider />

      <div className="grid grid-cols-12 gap-[2rem] mb-[2rem]">
        {comics.map((comic, index) => (
          <div key={index} className="col-span-2 h-[44rem]">
            <ReadingHistoryCard comic={comic} currentOrdinal={lastRead[comic.slug]} onClickRemove={onClickRemove} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ReadingHistoryModule;

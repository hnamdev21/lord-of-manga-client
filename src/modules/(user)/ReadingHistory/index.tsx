"use client";

import { Divider } from "antd";
import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import LocalStorageKey from "@/constants/local-key";
import { Comic } from "@/types/data";
import { BaseResponse } from "@/types/response";

import ReadingHistoryCard from "./components/ReadingHistoryCard";
import styles from "./styles.module.scss";

const ReadingHistoryModule = () => {
  const [lastRead, setLastRead] = React.useState<Record<string, number>>({});
  const [comics, setComics] = React.useState<Comic[]>([]);

  useQuery(
    ["readingHistory"],
    async () => {
      const slugs = Object.keys(lastRead);
      const { data } = (
        await AXIOS_INSTANCE.post<BaseResponse<Comic[]>>("/comics/slugs", {
          slugs,
        })
      ).data;
      setComics(data);

      return data;
    },
    {
      enabled: !!Object.keys(lastRead).length,
    }
  );

  const onClickRemove = (comic: Comic) => {
    const lastRead = JSON.parse(localStorage.getItem(LocalStorageKey.LAST_READ) || "{}");
    delete lastRead[comic.slug];
    setComics(comics.filter((c) => c.slug !== comic.slug));
    localStorage.setItem(LocalStorageKey.LAST_READ, JSON.stringify(lastRead));
  };

  React.useEffect(() => {
    const lastRead = JSON.parse(localStorage.getItem(LocalStorageKey.LAST_READ) || "{}");

    setLastRead(lastRead);
  }, []);

  return (
    <Container noGrid className={styles.container}>
      <Typography tag="h1" fontSize="2xl" align="center">
        Reading History
      </Typography>
      <Typography tag="p" fontSize="sm" align="center" italic>
        Reading history only available on this device
      </Typography>

      <Divider className={styles.divider} />

      <div className={styles.container__data}>
        {comics.map((comic, index) => (
          <div key={index} className={styles.container__data__item}>
            <ReadingHistoryCard comic={comic} currentOrdinal={lastRead[comic.slug]} onClickRemove={onClickRemove} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ReadingHistoryModule;

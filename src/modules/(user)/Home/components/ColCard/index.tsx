"use client";

import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import CardComicHorizontal from "@/components/CardComicHorizontal";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import styles from "./styles.module.scss";

type ColCardProps = {
  title: string;
  fetchUrl: string;
};

const ColCard = ({ title, fetchUrl }: ColCardProps) => {
  const { data } = useQuery(["home", "comics", fetchUrl], async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>(fetchUrl)).data;
    return data.content;
  });

  return (
    <React.Fragment>
      <Typography tag="h5" fontSize="lg" className={styles.title}>
        {title}
      </Typography>

      <div className={styles.columns}>
        <div className={styles.columns__item}>
          {data?.slice(0, Math.floor(data.length / 2)).map((comic) => <CardComicHorizontal key={comic.id} {...comic} />)}
        </div>
        <div className={styles.columns__item}>
          {data?.slice(Math.floor(data.length / 2), data.length).map((comic) => <CardComicHorizontal key={comic.id} {...comic} />)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ColCard;

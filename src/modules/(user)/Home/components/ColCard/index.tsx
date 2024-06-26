"use client";

import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import CardComicHorizontal from "@/components/CardComicHorizontal";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

type ColCardProps = {
  title: string;
  fetchUrl: string;
};

const ColCard = ({ title, fetchUrl }: ColCardProps) => {
  const { data: comics } = useQuery(["comics", fetchUrl], async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>(fetchUrl)).data;
    return data.content;
  });

  return (
    <React.Fragment>
      <Typography tag="h5" fontSize="lg" className="mb-[1rem]">
        {title}
      </Typography>

      <div className="grid grid-cols-2 gap-[2rem]">
        <div className="col-span-1 flex flex-col gap-[1rem]">
          {comics?.slice(0, Math.floor(comics.length / 2)).map((comic) => <CardComicHorizontal key={comic.id} {...comic} />)}
        </div>
        <div className="col-span-1 flex flex-col gap-[1rem]">
          {comics?.slice(Math.floor(comics.length / 2), comics.length).map((comic) => <CardComicHorizontal key={comic.id} {...comic} />)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ColCard;

"use client";

import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Typography from "@/components/Typography";
import { BaseResponse } from "@/types/response";

type ListDataProps = {
  prefix: string;
  fetchUrl: string;
};

const ListData = ({ prefix, fetchUrl }: ListDataProps) => {
  const { data } = useQuery(["listData", fetchUrl], async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<any>>(fetchUrl)).data;
    return data.content;
  });

  return (data || []).map((item: any) => (
    <li key={item.id}>
      <Link href={`/${prefix}${item.slug}`}>
        <Typography tag="span" fontSize="sm">
          {item.name}
        </Typography>
      </Link>
    </li>
  ));
};

export default ListData;

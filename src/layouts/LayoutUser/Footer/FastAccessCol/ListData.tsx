"use client";

import Link from "next/link";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Typography from "@/components/Typography";
import { BaseResponse } from "@/types/response";

type ListDataProps = {
  prefix: string;
  fetchUrl: string;
};

const ListData = ({ prefix, fetchUrl }: ListDataProps) => {
  const [data, setData] = React.useState<
    Array<{
      name: string;
      slug: string;
    }>
  >([]);

  const fetchData = async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<any>>(fetchUrl)).data;
    setData(data.content);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (data || []).map((item, index) => (
    <li key={index}>
      <Link href={`/${prefix}${item.slug}`}>
        <Typography tag="span" fontSize="sm">
          {item.name}
        </Typography>
      </Link>
    </li>
  ));
};

export default ListData;

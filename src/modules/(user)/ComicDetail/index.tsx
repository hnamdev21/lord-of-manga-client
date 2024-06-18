"use client";

import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Container from "@/components/Container";
import { Comic } from "@/types/data";
import { BaseResponse } from "@/types/response";

type ComicDetailModuleProps = {
  comicSlug: string;
};

const ComicDetailModule = ({ comicSlug }: ComicDetailModuleProps) => {
  const [comic, setComic] = React.useState<Comic | null>(null);

  const fetchComic = async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<Comic>>(`/comics/${comicSlug}`)).data;

    if (data) {
      setComic(data);
    }
  };

  React.useEffect(() => {
    fetchComic();
  }, []);

  return (
    <React.Fragment>
      <div></div>

      <Container>{comic?.title}</Container>
    </React.Fragment>
  );
};

export default ComicDetailModule;

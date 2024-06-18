"use client";

import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Container from "@/components/Container";
import { Category } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import ColCard from "./components/ColCard";
import Hero from "./components/Hero";
import RowCard from "./components/RowCard";

const HomeModule = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const fetchCategories = async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Category[]>>>("/categories?size=4")).data;

    setCategories(data.content);
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-[4rem]">
      <div className="bg-[var(--color-black)]">
        <Hero />
      </div>

      <Container className="relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[105%] w-[.1rem] bg-[var(--color-gray)]" />

        <div className="col-span-6">
          <ColCard title="Latest update" fetchUrl="/comics?size=8&sortBy=updatedAt" />
        </div>

        <div className="col-span-6">
          <ColCard title="Most viewed" fetchUrl="/comics?size=8&sortBy=viewCount" />
        </div>
      </Container>

      {categories.map((category) => (
        <RowCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default HomeModule;

"use client";

import { Carousel } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import CardComicHorizontal from "@/components/CardComicHorizontal";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { Category } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import RowCard from "./components/RowCard";

const contentStyles: React.CSSProperties = {
  height: "600px",
  padding: "20px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
};

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
      <Container noGrid>
        <Carousel autoplay arrows dotPosition="left" className="w-full h-[60rem]">
          <div>
            <h3 style={contentStyles}>1</h3>
          </div>
          <div>
            <h3 style={contentStyles}>2</h3>
          </div>
          <div>
            <h3 style={contentStyles}>3</h3>
          </div>
          <div>
            <h3 style={contentStyles}>4</h3>
          </div>
        </Carousel>
      </Container>

      <Container className="relative">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[105%] w-[.1rem]"
          style={{ backgroundColor: "var(--color-gray)" }}
        />

        <div className="col-span-6">
          <Typography tag="h5" fontSize="lg" className="mb-[2rem]">
            Latest update
          </Typography>

          <div className="flex flex-col gap-[2rem]">
            <div className="col-span-12 flex flex-col gap-[1rem]">
              {Array.from({ length: 4 }).map((_, index) => (
                <CardComicHorizontal key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-6">
          <Typography tag="h5" fontSize="lg" className="mb-[2rem]">
            Most viewed
          </Typography>

          <div className="flex flex-col gap-[2rem]">
            <div className="col-span-12 flex flex-col gap-[1rem]">
              {Array.from({ length: 4 }).map((_, index) => (
                <CardComicHorizontal key={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {categories.map((category) => (
        <RowCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default HomeModule;

"use client";

import { Carousel } from "antd";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

const Hero = () => {
  const { data: comics } = useQuery("comics", async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>("/comics?size=4&sortBy=createdAt")).data;
    return data.content;
  });

  return (
    <React.Fragment>
      <Carousel autoplay arrows dotPosition="left" className="w-full h-[60rem]">
        {comics?.map((comic) => (
          <div key={comic.id}>
            <Container noGrid className="h-[60rem] relative grid grid-cols-9 gap-[2rem]">
              <div className="absolute top-0 left-0 w-full h-full brightness-[.5] blur-lg">
                <Image
                  src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.thumbnailPath}
                  alt={`Thumbnail image of ${comic.title}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="col-span-2 py-[1rem] flex flex-col justify-between gap-[1rem]">
                <div className="h-[90%] rounded-2xl overflow-hidden relative">
                  <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.coverPath} alt={`Cover image of ${comic.title}`} layout="fill" />
                </div>

                <Button href={"/comics/" + comic.slug} size="lg" className="block relative text-center">
                  Read now
                </Button>
              </div>

              <div className="relative col-span-7 flex flex-col justify-between py-[1rem] gap-[2rem]">
                <div className="w-full flex flex-col gap-[1rem]">
                  <Typography tag="h3" fontSize="8xl" fontWeight="md" className="mb-[.5rem]">
                    {comic.title}
                  </Typography>

                  <div className="flex gap-[1rem]">
                    {comic.categories.slice(0, 8).map((category) => (
                      <Button href="#" variant="outline" key={category.slug}>
                        {category.name}
                      </Button>
                    ))}
                  </div>

                  <div>
                    <Typography tag="p" fontSize="md">
                      Author: {comic.author}
                    </Typography>
                    <Typography tag="p" fontSize="md">
                      Publisher: {comic.creator.fullName}
                    </Typography>
                  </div>

                  <Typography tag="p" fontSize="md" className="line-clamp-8 ">
                    {comic.description}
                  </Typography>
                </div>
              </div>
            </Container>
          </div>
        ))}
      </Carousel>
    </React.Fragment>
  );
};

export default Hero;

"use client";

import { Carousel } from "antd";
import Image from "next/image";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

const Hero = () => {
  const [comics, setComics] = React.useState<Comic[]>([]);

  const fetchComics = async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>("/comics?size=4&sortBy=createdAt")).data;
    setComics(data.content);
  };

  React.useEffect(() => {
    fetchComics();
  }, []);

  return (
    <React.Fragment>
      <Carousel autoplay arrows dotPosition="left" className="w-full h-[60rem]">
        {comics.map((comic) => (
          <div key={comic.id}>
            <Container className="h-[60rem] relative">
              <div className="absolute top-0 left-0 w-full h-full brightness-[.5] blur-lg">
                <Image
                  src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.thumbnailPath}
                  alt={`Thumbnail image of ${comic.title}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="col-span-3 py-[1rem]">
                <div className="h-full rounded-2xl overflow-hidden relative">
                  <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.coverPath} alt={`Cover image of ${comic.title}`} layout="fill" />
                </div>
              </div>

              <div className="relative col-span-9 flex flex-col justify-between py-[1rem] gap-[2rem]">
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

                <Button href="#" size="lg" className="max-w-max">
                  Read now
                </Button>
              </div>
            </Container>
          </div>
        ))}
      </Carousel>
    </React.Fragment>
  );
};

export default Hero;

"use client";

import { Carousel } from "antd";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { Comic, ComicStatus } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import styles from "./styles.module.scss";

const Hero = () => {
  const { data: comics } = useQuery("comics", async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>("/comics?size=4&sortBy=createdAt&status=" + ComicStatus.APPROVED)).data;
    return data.content;
  });

  return (
    <React.Fragment>
      <Carousel autoplay arrows dotPosition="left" className={styles.carousel}>
        {comics?.map((comic) => (
          <div key={comic.id}>
            <Container noGrid className={styles.carousel__item}>
              <div className={styles.thumbnailContainer}>
                <Image
                  src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.thumbnailPath}
                  alt={`Thumbnail image of ${comic.title}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className={styles.leftContent}>
                <div className={styles.leftContent__coverContainer}>
                  <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.coverPath} alt={`Cover image of ${comic.title}`} layout="fill" />
                </div>

                <Button href={"/comics/" + comic.slug} size="lg" className="block relative text-center" style={{ width: "100%" }}>
                  Read now
                </Button>
              </div>

              <div className={styles.rightContent}>
                <Typography tag="h3" fontSize="8xl" fontWeight="md" className={styles.rightContent__title}>
                  {comic.title}
                </Typography>

                <div className={styles.rightContent__categories}>
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

                <Typography tag="p" fontSize="md" className="line-clamp-8">
                  {comic.description}
                </Typography>
              </div>
            </Container>
          </div>
        ))}
      </Carousel>
    </React.Fragment>
  );
};

export default Hero;

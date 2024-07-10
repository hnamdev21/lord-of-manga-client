"use client";

import { Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaComment, FaDollarSign, FaEye } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { localApiUrl } from "@/constants/config";
import { Comic } from "@/types/data";
import { BaseResponse } from "@/types/response";
import { timestampToDateTime } from "@/utils/formatter";

import styles from "./styles.module.scss";

type ComicDetailModuleProps = {
  comicSlug: string;
};

const ComicDetailModule = ({ comicSlug }: ComicDetailModuleProps) => {
  const router = useRouter();
  const [chapters, setChapters] = React.useState<Comic["chapters"] | null>(null);

  const { data } = useQuery(["comic", comicSlug], async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<Comic>>(`/comics/slug/${comicSlug}`)).data;
    setChapters(data.chapters);
    return data;
  });

  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!data) return;

      const { value } = e.target;

      if (value) {
        const filteredChapters = data.chapters.filter((chapter) => chapter.title.toLowerCase().includes(value.toLowerCase()));
        setChapters(filteredChapters);
      } else {
        setChapters(data.chapters);
      }
    },
    [data]
  );

  return (
    <React.Fragment>
      <Container className={styles.hero}>
        <div className={styles.hero__thumbnailContainer}>
          <Image src={localApiUrl + "/uploads/" + data?.thumbnailPath} alt={`Thumbnail image of ${data?.title}`} layout="fill" objectFit="cover" />
        </div>

        <div className={styles.hero__leftContent}>
          <Image src={localApiUrl + "/uploads/" + data?.coverPath} alt={`Cover image of ${data?.title}`} layout="fill" />
        </div>

        <div className={styles.hero__rightContent}>
          <Typography tag="h3" fontSize="6xl" fontWeight="md" textColor="light">
            {data?.title}
          </Typography>

          <div className={styles.hero__rightContent__categories}>
            {data?.categories.slice(0, 8).map((category) => (
              <Button href="#" variant="outline" key={category.slug} color="light" size="sm">
                {category.name}
              </Button>
            ))}
          </div>

          <div>
            <Typography tag="p" textColor="light">
              Author: {data?.author}
            </Typography>
            <Typography tag="p" textColor="light">
              Publisher: {data?.creator.fullName}
            </Typography>
          </div>

          <Typography tag="p" className="line-clamp-8" textColor="light">
            {data?.description}
          </Typography>
        </div>
      </Container>

      <Container className={styles.content}>
        <div className={styles.content__header}>
          <Typography tag="h3" fontSize="2xl" fontWeight="md" className={styles.content__header__left}>
            Chapters
          </Typography>

          <Form className={styles.content__header__right}>
            <Form.Item name="title" className={styles.content__header__right__item}>
              <Input placeholder="Search chapter title" onChange={onSearchChange} />
            </Form.Item>
          </Form>
        </div>

        {chapters?.map((chapter, index) => (
          <div key={index} className={styles.content__card} onClick={() => router.push(`/comics/${comicSlug}/${chapter.slug}`)}>
            <div className={styles.content__card__left}>
              <div className={styles.content__card__left__tag}>
                {chapter.type === "FREE" ? (
                  <Typography tag="span" fontSize="sm" fontWeight="bold" textColor="light">
                    FREE
                  </Typography>
                ) : (
                  <Typography tag="span" fontSize="sm" fontWeight="bold" textColor="light">
                    <FaDollarSign />
                  </Typography>
                )}
              </div>

              <Typography tag="h3" fontSize="lg" fontWeight="md">
                {chapter.title}
              </Typography>
            </div>

            <div className={styles.content__card__right}>
              <Typography tag="p" fontSize="sm">
                {timestampToDateTime(chapter.createdAt)}
              </Typography>
              <div className={styles.content__card__right__stats}>
                <Typography tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
                  <FaComment /> {chapter.comments.length}
                </Typography>
                <Typography tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
                  <FaEye /> {chapter.viewCount}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </React.Fragment>
  );
};

export default ComicDetailModule;

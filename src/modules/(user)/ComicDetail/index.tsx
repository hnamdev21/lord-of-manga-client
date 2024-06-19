"use client";

import { Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaComment, FaEye } from "react-icons/fa";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";
import { BaseResponse } from "@/types/response";

type ComicDetailModuleProps = {
  comicSlug: string;
};

const ComicDetailModule = ({ comicSlug }: ComicDetailModuleProps) => {
  const router = useRouter();

  const [comic, setComic] = React.useState<Comic | null>(null);
  const [chapters, setChapters] = React.useState<Comic["chapters"] | null>(null);

  const fetchComic = async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<Comic>>(`/comics/slug/${comicSlug}`)).data;

    console.log("[ComicDetailModule] fetchComic -> data :::: ", data);

    if (data) {
      setComic(data);
      setChapters(data.chapters);
    }
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!comic) return;

    const { value } = e.target;

    if (value) {
      const filteredChapters = comic.chapters.filter((chapter) => chapter.title.toLowerCase().includes(value.toLowerCase()));
      setChapters(filteredChapters);
    } else {
      setChapters(comic?.chapters);
    }
  };

  React.useEffect(() => {
    fetchComic();
  }, []);

  return (
    <React.Fragment>
      <Container className="h-[60rem] mb-[4rem] relative">
        <div className="absolute top-0 left-0 w-full h-full brightness-[.5] blur-lg">
          <Image
            src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic?.thumbnailPath}
            alt={`Thumbnail image of ${comic?.title}`}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="col-span-3 py-[1rem]">
          <div className="h-full rounded-2xl overflow-hidden relative">
            <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic?.coverPath} alt={`Cover image of ${comic?.title}`} layout="fill" />
          </div>
        </div>

        <div className="relative col-span-9 flex flex-col justify-between py-[1rem] gap-[2rem]">
          <div className="w-full flex flex-col gap-[1rem]">
            <Typography tag="h3" fontSize="8xl" fontWeight="md" className="mb-[.5rem]">
              {comic?.title}
            </Typography>

            <div className="flex gap-[1rem]">
              {comic?.categories.slice(0, 8).map((category) => (
                <Button href="#" variant="outline" key={category.slug}>
                  {category.name}
                </Button>
              ))}
            </div>

            <div>
              <Typography tag="p" fontSize="md">
                Author: {comic?.author}
              </Typography>
              <Typography tag="p" fontSize="md">
                Publisher: {comic?.creator.fullName}
              </Typography>
            </div>

            <Typography tag="p" fontSize="md" className="line-clamp-8 ">
              {comic?.description}
            </Typography>
          </div>
        </div>
      </Container>

      <Container className="mb-[4rem]">
        <div className="col-span-12 grid grid-col-12 gap-[2rem] items-end">
          <Typography tag="h3" fontSize="2xl" fontWeight="md" className="mb-[1rem] col-span-1">
            Chapters
          </Typography>

          <Form className="col-start-10 col-span-2">
            <Form.Item name="title">
              <Input placeholder="Search chapter title" onChange={onSearchChange} />
            </Form.Item>
          </Form>
        </div>

        {chapters?.map((chapter, index) => (
          <div
            key={index}
            className="col-span-12 flex justify-between p-[2rem] rounded-lg bg-[var(--color-dark)] hover:brightness-110 transition ease-in-out duration-300 cursor-pointer"
            onClick={() => router.push(`/comics/${comicSlug}/${chapter.slug}`)}
          >
            <Typography tag="h3" fontSize="xl" fontWeight="md">
              {chapter.title}
            </Typography>

            <div className="flex flex-col">
              <Typography tag="p" fontSize="sm">
                12/12/2021
              </Typography>
              <div className="flex items-center gap-[1.5rem]">
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

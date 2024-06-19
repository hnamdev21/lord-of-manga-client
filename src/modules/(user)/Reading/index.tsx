"use client";

import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { Chapter, Comic } from "@/types/data";
import { BaseResponse } from "@/types/response";

type ReadingModuleProps = {
  comicSlug: string;
  chapterSlug: string;
};

const ReadingModule = ({ comicSlug, chapterSlug }: ReadingModuleProps) => {
  const { data } = useQuery(["comic", comicSlug, "chapter", chapterSlug], async () => {
    const { data: comic } = (await AXIOS_INSTANCE.get<BaseResponse<Comic>>("/comics/slug/" + comicSlug)).data;
    const { data: chapter } = (await AXIOS_INSTANCE.get<BaseResponse<Chapter>>("/chapters/slug/" + chapterSlug + "/comic/" + comic.id)).data;

    return {
      comic,
      chapter,
    };
  });

  const currentIndex = data?.comic.chapters.findIndex((c) => c.slug === chapterSlug) ?? -1;
  const havePrevious = currentIndex > 0;
  const haveNext = currentIndex < (data?.comic.chapters.length || -1) - 1;

  return (
    <div>
      <div className="py-[1rem] bg-[var(--color-black)]">
        <Container>
          <div className="col-start-5 col-span-4 flex gap-[2rem]">
            <div className="w-[20%]">
              {havePrevious && (
                <Button
                  variant="outline"
                  className="flex justify-center items-center"
                  href={`/comics/${comicSlug}/${data?.comic.chapters[currentIndex - 1]?.slug}`}
                >
                  Previous
                </Button>
              )}
            </div>

            <Typography tag="h4" fontSize="md" className="line-clamp-1 flex-1 border border-solid border-[var(--border-input)] rounded-md" align="center">
              {data?.chapter.title}
            </Typography>

            <div className="w-[20%]">
              {haveNext && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex justify-center items-center"
                  href={`/comics/${comicSlug}/${data?.comic.chapters[currentIndex + 1]?.slug}`}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container className="gap-x-[2rem] gap-y-0">
        {data?.chapter &&
          Array.from({ length: data?.chapter.totalPages }).map((_, index) => (
            <div
              className="col-start-3 col-span-8 relative"
              style={{
                height: "calc(100vh - 5.2rem)",
              }}
              key={index}
            >
              <Image
                src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/comic/" + data?.comic.id + "/chapter-" + data?.chapter.ordinal + "/" + index + ".png"}
                alt={`Chapter image of ${index}`}
                layout="fill"
              />
            </div>
          ))}
      </Container>
    </div>
  );
};

export default ReadingModule;
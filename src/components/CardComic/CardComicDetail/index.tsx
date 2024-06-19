import Image from "next/image";
import React from "react";
import { FaBookmark, FaComment, FaEye } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";
import { timestampToDateTime } from "@/utils/formatter";

type CardComicDetailProps = Comic;

const CardComicDetail = ({
  title,
  description,
  author,
  coverPath,
  chapters,
  categories,
  creator,
  createdAt,
  updatedAt,
  viewCount,
  slug,
}: CardComicDetailProps) => {
  return (
    <React.Fragment>
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          boxShadow: "0 0 1rem .25rem rgba(0, 0, 0, 0.4)",
        }}
      />
      <div className="relative w-[60rem] flex flex-col gap-[1rem]">
        <div className="h-4/5 w-full flex gap-[1rem]">
          <div className="w-2/5 h-[38rem] rounded-2xl overflow-hidden relative">
            <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + coverPath} alt={`Cover image of ${title}`} layout="fill" objectFit="cover" />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col">
              <Typography fontSize="lg" fontWeight="bold" tag="h5" className="line-clamp-1">
                {title}
              </Typography>

              <Typography tag="h6" className="line-clamp-1">
                Author: {author}
              </Typography>
              <Typography tag="h6" className="line-clamp-1">
                Total chapters: {chapters.length}
              </Typography>

              <Typography tag="h6" className="line-clamp-1">
                Publisher: {creator.fullName}
              </Typography>

              <Typography tag="h6" className="line-clamp-1">
                Categories: {categories.map((category) => category.name).join(", ")}
              </Typography>

              <Typography tag="h6" className="line-clamp-1">
                Published: {timestampToDateTime(createdAt)}
              </Typography>
              <Typography tag="h6" className="line-clamp-1">
                Last updated: {timestampToDateTime(updatedAt)}
              </Typography>

              <div className="flex items-center gap-[1.5rem]">
                <Typography tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
                  <FaComment /> 100
                </Typography>
                <Typography tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
                  <FaEye /> {viewCount}
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-[1rem]">
              <Button className="block flex-1 text-center" href={"/comics/" + slug}>
                Read
              </Button>

              <Button
                className="w-[10%] flex items-center justify-center aspect-square"
                element="button"
                type="button"
                variant="outline"
                style={{
                  padding: "1rem",
                }}
              >
                <FaBookmark />
              </Button>
            </div>
          </div>
        </div>

        <div className="h-1/5">
          <Typography className="line-clamp-3">{description}</Typography>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardComicDetail;

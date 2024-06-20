import Image from "next/image";
import React from "react";
import { FaBookmark, FaDollarSign } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";

type ReadingHistoryCardProps = {
  comic: Comic;
  currentOrdinal: number;
  onClickRemove: (comic: Comic) => void;
};

const ReadingHistoryCard = ({ comic, currentOrdinal, onClickRemove }: ReadingHistoryCardProps) => {
  const { coverPath, title, type } = comic;
  const currentSlug = comic.chapters.find((chapter) => chapter.ordinal === currentOrdinal)?.slug;

  return (
    <div className="w-full h-full rounded-md overflow-hidden relative">
      <Button
        className="absolute top-[.5rem] right-[.5rem] z-10 flex items-center justify-center aspect-square backdrop-blur-xl"
        element="button"
        type="button"
        variant="plain"
        size="sm"
        style={{
          color: "var(--color-black)",
          borderColor: "var(--color-black)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <FaBookmark />
      </Button>

      <div className="absolute top-[.5rem] left-[.5rem] z-10 flex items-center justify-center backdrop-blur-[2px] px-[.5rem] h-[1.6rem] rounded-md bg-[var(--color-primary)]">
        {type === "FREE" ? (
          <Typography tag="span" fontSize="sm" fontWeight="bold">
            FREE
          </Typography>
        ) : (
          <Typography tag="span" fontSize="sm" fontWeight="bold">
            <FaDollarSign />
          </Typography>
        )}
      </div>

      <div className="w-full h-[90%] relative">
        <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + coverPath} alt={`Cover image of ${title}`} layout="fill" />

        <div className="absolute bottom-0 left-0 z-10 w-full h-[12.5%] bg-[rgba(0,0,0,.8)] p-[1rem] flex gap-[1rem] backdrop-blur-md">
          <Button
            element="button"
            type="button"
            variant="outline"
            size="sm"
            style={{
              height: "100%",
            }}
            className="flex-1 flex justify-center items-center"
            onClick={() => onClickRemove(comic)}
          >
            Remove
          </Button>
          <Button
            href={`/comics/${comic.slug}/${currentSlug}`}
            size="sm"
            style={{
              height: "100%",
            }}
            className="w-[75%] flex justify-center items-center"
          >
            Continue Reading
          </Button>
        </div>
      </div>

      <div className="w-full h-[10%] px-[1rem] flex items-center bg-[var(--color-dark)]">
        <Typography tag="h6" fontSize="md" className="line-clamp-1">
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default ReadingHistoryCard;

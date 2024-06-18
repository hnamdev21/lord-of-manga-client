import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaComment, FaEye } from "react-icons/fa";

import { Comic } from "@/types/data";

import Button from "../Button";
import Typography from "../Typography";

type CardComicHorizontalProps = Comic;

const CardComicHorizontal = ({ title, coverPath, description, slug, viewCount, categories }: CardComicHorizontalProps) => {
  const router = useRouter();

  return (
    <div
      className="w-full flex rounded-md overflow-hidden bg-[var(--color-dark)] cursor-pointer hover:brightness-125 transition duration-300 ease-in-out"
      onClick={() => router.push("/comics/" + slug)}
    >
      <div className="w-1/4 h-[14rem] relative">
        <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + coverPath} alt={`Cover image of ${title}`} layout="fill" objectFit="cover" />
      </div>

      <div className="flex-1 py-[1rem] px-[2rem] flex flex-col justify-between">
        <div className="flex-1">
          <Typography tag="h6" className="line-clamp-1">
            {title}
          </Typography>

          <Typography tag="p" fontSize="sm" className="mb-[1rem] line-clamp-3">
            {description}
          </Typography>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex-1 flex gap-[1rem]">
            {categories.slice(0, 2).map((category) => (
              <Button href="#" variant="outline" size="xs" key={category.slug}>
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex-1 flex justify-end gap-[1rem]">
            <div className="flex items-center gap[.5rem]">
              <FaComment />
              <Typography tag="span" fontSize="xs" className="ml-[.5rem]">
                1.2k
              </Typography>
            </div>

            <div className="flex items-center gap[.5rem]">
              <FaEye />
              <Typography tag="span" fontSize="xs" className="ml-[.5rem]">
                {viewCount}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComicHorizontal;

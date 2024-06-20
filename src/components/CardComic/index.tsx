"use client";

import { Popover } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaBookmark, FaDollarSign } from "react-icons/fa";

import { Comic } from "@/types/data";

import Button from "../Button";
import Typography from "../Typography";
import CardComicDetail from "./CardComicDetail";

type CardComicProps = Comic;

const CardComic = ({ ...props }: CardComicProps) => {
  const router = useRouter();
  const { coverPath, title, slug, type } = props;

  return (
    <Popover color="var(--color-dark)" content={<CardComicDetail {...props} />} placement="left">
      <div
        className="w-full h-[34rem] rounded-md overflow-hidden relative bg-[var(--color-dark)] cursor-pointer"
        onClick={() => router.push("/comics/" + slug)}
      >
        <Button
          className="absolute top-[.5rem] right-[.5rem] z-10 flex items-center justify-center aspect-square backdrop-blur-[2px]"
          element="button"
          type="button"
          variant="plain"
          size="sm"
          style={{
            color: "var(--color-black)",
            borderColor: "var(--color-black)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            height: "2rem",
            fontSize: ".8rem",
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

        <div className="w-full h-[85%] relative">
          <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + coverPath} alt={`Cover image of ${title}`} layout="fill" />
        </div>

        <div className="w-full h-[15%] px-[1rem] flex items-center">
          <Typography tag="h6" fontSize="md" className="line-clamp-1">
            {title}
          </Typography>
        </div>
      </div>
    </Popover>
  );
};

export default CardComic;

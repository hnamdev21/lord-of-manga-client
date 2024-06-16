"use client";

import { Popover } from "antd";
import Image from "next/image";
import React from "react";
import { FaBookmark } from "react-icons/fa";

import { Comic } from "@/types/data";

import Button from "../Button";
import Typography from "../Typography";
import CardComicDetail from "./CardComicDetail";

type CardComicProps = Comic;

const CardComic = ({ ...props }: CardComicProps) => {
  const { coverPath, title } = props;

  return (
    <Popover color="var(--color-dark)" content={<CardComicDetail {...props} />} placement="left">
      <div className="w-full h-[28rem] rounded-md overflow-hidden relative bg-[var(--color-dark)]">
        <Button
          className="absolute top-0 right-0 flex items-center justify-center aspect-square"
          element="button"
          type="button"
          variant="plain"
          size="sm"
          style={{
            color: "var(--color-black)",
            borderColor: "var(--color-black)",
          }}
        >
          <FaBookmark />
        </Button>

        <div className="w-full h-[85%]">
          <Image
            src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + coverPath}
            alt={`Cover image of ${title}`}
            width={400}
            height={800}
            className="object-cover"
          />
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

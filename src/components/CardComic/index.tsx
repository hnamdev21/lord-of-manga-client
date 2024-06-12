import { Popover } from "antd";
import React from "react";

import { Comic } from "@/types/data";

import Typography from "../Typography";
import CardComicDetail from "./CardComicDetail";

type CardComicProps = Comic;

const CardComic = ({ ...props }: CardComicProps) => {
  return (
    <Popover arrow={false} color="var(--color-light)" content={<CardComicDetail {...props} />} placement="left">
      <div
        className="w-full h-[36rem] rounded-md overflow-hidden"
        style={{
          backgroundColor: "var(--color-dark)",
        }}
      >
        <div className="w-full h-4/5 bg-white"></div>

        <div className="w-full h-1/5 p-[1rem]">
          <Typography tag="h6" className="line-clamp-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim molestiae eligendi tempora expedita sed, quia suscipit consequuntur architecto, ut
            illum maiores! Expedita culpa rem nisi reprehenderit eius facilis esse voluptate.
          </Typography>
        </div>
      </div>
    </Popover>
  );
};

export default CardComic;

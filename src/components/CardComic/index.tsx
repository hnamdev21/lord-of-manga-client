import React from "react";

import { Comic } from "@/types/data";

import Typography from "../Typography";

type CardComicProps = Comic;

const CardComic = ({ ...props }: CardComicProps) => {
  return (
    <div
      className="w-full h-[36rem] rounded-md overflow-hidden"
      style={{
        backgroundColor: "var(--color-dark)",
      }}
    >
      <div className="w-full h-4/5 bg-white"></div>

      <div className="w-full h-1/4 p-[1rem]">
        <Typography tag="h6" className="line-clamp-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim molestiae eligendi tempora expedita sed, quia suscipit consequuntur architecto, ut
          illum maiores! Expedita culpa rem nisi reprehenderit eius facilis esse voluptate.
        </Typography>
      </div>
    </div>
  );
};

export default CardComic;

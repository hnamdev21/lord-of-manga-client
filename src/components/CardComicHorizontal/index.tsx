import React from "react";
import { FaComment, FaEye } from "react-icons/fa";

import { Comic } from "@/types/data";

import Button from "../Button";
import Typography from "../Typography";

type CardComicHorizontalProps = Comic;

const CardComicHorizontal = ({ ...props }: CardComicHorizontalProps) => {
  return (
    <div
      className="w-full flex rounded-md overflow-hidden"
      style={{
        backgroundColor: "var(--color-dark)",
      }}
    >
      <div className="w-1/4 h-[20rem] bg-white"></div>

      <div className="flex-1 py-[1rem] px-[2rem] flex flex-col justify-between">
        <div className="flex-1">
          <Typography tag="h6" fontSize="lg" className="mb-[1rem] line-clamp-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum, optio reprehenderit amet esse aliquid vel quas id modi aperiam similique quam
            autem neque, consequatur molestias commodi corporis, sit eum molestiae.
          </Typography>

          <Typography tag="p" className="mb-[1rem] line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, purus nec vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Vivamus scelerisque, purus nec vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, purus nec vehicula.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, purus nec vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Vivamus scelerisque, purus nec vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, purus nec vehicula.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, purus nec vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Vivamus scelerisque, purus nec vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, purus nec vehicula.
          </Typography>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-[1rem]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Button href="#" variant="outline" size="sm" key={index}>
                Lorem
              </Button>
            ))}
          </div>

          <div className="flex gap-[1rem]">
            <div className="flex items-center gap[.5rem]">
              <FaComment scale={0.4} />
              <Typography tag="span" fontSize="sm" className="ml-[.5rem]">
                1.2k
              </Typography>
            </div>

            <div className="flex items-center gap[.5rem]">
              <FaEye scale={0.4} />
              <Typography tag="span" fontSize="sm" className="ml-[.5rem]">
                1.2k
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComicHorizontal;

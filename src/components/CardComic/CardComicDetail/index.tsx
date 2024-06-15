import React from "react";
import { FaBookmark, FaComment, FaEye } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";

type CardComicDetailProps = Comic;

const CardComicDetail = ({ ...props }: CardComicDetailProps) => {
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
          <div className="w-2/5 h-[30rem] rounded-2xl overflow-hidden bg-black"></div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col">
              <Typography textColor="black" fontSize="lg" fontWeight="bold" tag="h5" className="line-clamp-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis similique saepe error cumque reprehenderit. Ipsum fugiat est sequi iure minus
                accusantium quisquam voluptates dolorum distinctio. Incidunt minus perferendis veniam sequi.
              </Typography>

              <Typography textColor="black" tag="h6" className="line-clamp-1">
                Author: Masashi Kishimoto
              </Typography>
              <Typography textColor="black" tag="h6" className="line-clamp-1">
                Current chapter: 100
              </Typography>

              <Typography textColor="black" tag="h6" className="line-clamp-1">
                Publisher: Admin
              </Typography>

              <Typography textColor="black" tag="h6" className="line-clamp-1">
                Published: 2022-01-01
              </Typography>
              <Typography textColor="black" tag="h6" className="line-clamp-1">
                Last updated: 2022-01-01
              </Typography>

              <div className="flex items-center gap-[1.5rem]">
                <Typography textColor="black" tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
                  <FaComment /> 100
                </Typography>
                <Typography textColor="black" tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
                  <FaEye /> 100
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-[1rem]">
              <Button className="block w-11/12 text-center" href="#">
                Read
              </Button>

              <Button
                className="flex-1 flex items-center justify-center aspect-square p-[1.5rem]"
                element="button"
                type="button"
                variant="outline"
                style={{
                  color: "var(--color-black)",
                  borderColor: "var(--color-black)",
                }}
              >
                <FaBookmark />
              </Button>
            </div>
          </div>
        </div>

        <div className="h-1/5">
          <Typography textColor="black" className="line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ut eaque vero delectus molestiae, corrupti labore minus fugiat exercitationem
            praesentium velit, eligendi laudantium assumenda tempore non rerum eos debitis a! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            dolorem suscipit neque quod? Repellat obcaecati in pariatur. Voluptatibus sapiente esse quaerat eius in maxime, ut doloribus beatae dolores expedita
            asperiores?
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardComicDetail;

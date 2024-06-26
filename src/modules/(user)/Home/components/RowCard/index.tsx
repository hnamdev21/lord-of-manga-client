import { Empty } from "antd";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import CardComic from "@/components/CardComic";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { Category, Comic } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

type RowCardProps = {
  category: Category;
  numberOfColumns: number;
};

const RowCard = ({ category, numberOfColumns }: RowCardProps) => {
  const { data: comics } = useQuery(["comics", category.name], async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>("comics/category/search?term=" + category.name)).data;
    return data.content;
  });

  return (
    <Container noGrid>
      <div className="flex justify-between items-center">
        <Typography tag="h5" fontSize="lg" className="mb-[1.5rem]">
          {category.name}
        </Typography>

        <Button href="#" size="sm" variant="plain" className="flex items-center gap-[.5rem]">
          View all <FaArrowRight scale={0.4} />
        </Button>
      </div>

      <div
        className="grid gap-[2rem] h-[34rem]"
        style={{
          gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        }}
      >
        {(comics?.length || 0) > numberOfColumns ? (
          comics?.splice(0, numberOfColumns).map((comic) => (
            <div key={comic.id} className="col-span-1 h-full">
              <CardComic {...comic} />
            </div>
          ))
        ) : (
          <div
            className="flex items-center justify-center"
            style={{
              gridColumn: `span ${numberOfColumns}`,
            }}
          >
            <Typography tag="h6" fontSize="md" align="center">
              <Empty />
            </Typography>
          </div>
        )}
      </div>
    </Container>
  );
};

export default RowCard;

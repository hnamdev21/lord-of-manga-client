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

import styles from "./styles.module.scss";

type RowCardProps = {
  category: Category;
  numberOfColumns: number;
};

const RowCard = ({ category, numberOfColumns }: RowCardProps) => {
  const { data: comics } = useQuery(["row-card", "comics", category.name], async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>("comics/category/search?term=" + category.name)).data; // TODO: BAKCEND
    return data.content;
  });

  return (
    <Container noGrid>
      <div className={styles.header}>
        <Typography tag="h5" fontSize="lg">
          {category.name}
        </Typography>

        <Button href="#" size="sm" color="dark" variant="plain" className={styles.header__button}>
          View all <FaArrowRight scale={0.4} />
        </Button>
      </div>

      <div
        className={styles.content}
        style={{
          gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        }}
      >
        {(comics?.length || 0) > 0 ? (
          comics?.splice(0, numberOfColumns).map((comic) => (
            <div key={comic.id} className={styles.content__item}>
              <CardComic {...comic} />
            </div>
          ))
        ) : (
          <div
            className={styles.content__empty}
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

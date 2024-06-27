"use client";

import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Container from "@/components/Container";
import { Category } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import ColCard from "./components/ColCard";
import Hero from "./components/Hero";
import RowCard from "./components/RowCard";
import styles from "./styles.module.scss";

const HomeModule = () => {
  const { data: categories } = useQuery("categories", async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Category[]>>>("/categories?size=4")).data;
    return data.content;
  });

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <Hero />
      </section>

      <Container className={styles.columnSection}>
        <div className={styles.columnSection__divider} />

        <div className={styles.columnSection__column}>
          <ColCard title="Latest update" fetchUrl="/comics?size=8&sortBy=updatedAt&status=APPROVE" />
        </div>

        <div className={styles.columnSection__column}>
          <ColCard title="Most viewed" fetchUrl="/comics?size=8&sortBy=viewCount&status=APPROVE" />
        </div>
      </Container>

      {categories?.map((category) => <RowCard key={category.id} category={category} numberOfColumns={7} />)}
    </div>
  );
};

export default HomeModule;

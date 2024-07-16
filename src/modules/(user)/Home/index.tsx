"use client";

import React from "react";
import { useQuery } from "react-query";

import Container from "@/components/Container";
import { CategoryAPI } from "@/services/apis/category";

import ColCard from "./components/ColCard";
import Hero from "./components/Hero";
import RowCard from "./components/RowCard";
import styles from "./styles.module.scss";

const HomeModule = () => {
  const { data: categories } = useQuery("categories", async () => {
    const response = await CategoryAPI.getAllCategories({ size: 4 });

    return response.data.content;
  });

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <Hero />
      </section>

      <Container className={styles.columnSection}>
        <div className={styles.columnSection__divider} />

        <div className={styles.columnSection__column}>
          <ColCard title="Latest update" fetchUrl={"/comics?size=8&sortBy=updatedAt"} />
        </div>

        <div className={styles.columnSection__column}>
          <ColCard title="Most viewed" fetchUrl={"/comics?size=8&sortBy=viewCount"} />
        </div>
      </Container>

      {categories?.map((category) => <RowCard key={category.id} category={category} numberOfColumns={7} />)}
    </div>
  );
};

export default HomeModule;

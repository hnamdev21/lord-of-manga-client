"use client";

import { Button, Empty, Form, FormProps, Input, InputNumber, Select } from "antd";
import React from "react";

import CardComic from "@/components/CardComic";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { filterComicTypeOptions, orderByOptions } from "@/constants/options";
import { VND_CURRENCY } from "@/constants/sign";
import { ComicAPI } from "@/services/apis/comic";
import { Comic } from "@/types/data";
import { FormComicFilter } from "@/types/form";
import { BaseGetResponse } from "@/types/response";
import { numberFormatter } from "@/utils/formatter";

import styles from "./styles.module.scss";

const initData = {
  title: "",
  sortBy: "all",
  type: "all",
  from: 0,
  to: 0,
} as FormComicFilter;

const User_ComicsModule = () => {
  const [data, setData] = React.useState<BaseGetResponse<Comic[]> | null>(null);
  const [filter, setFilter] = React.useState<FormComicFilter>(initData);
  const [page, setPage] = React.useState(1);

  const onFinish: FormProps<FormComicFilter>["onFinish"] = async (values: FormComicFilter) => {
    const response = await ComicAPI.getAllComics({
      params: {
        ...values,
        pageNumber: page,
        size: 6,
      },
    });

    setPage(1);
    setData(response.data);
    setFilter(values);
  };

  const onLoadMore = async () => {
    const nextPage = page + 1;
    const response = await ComicAPI.getAllComics({
      params: {
        ...filter,
        pageNumber: nextPage,
        size: 6,
      },
    });

    setPage(nextPage);
    setData((prev) =>
      prev
        ? {
            ...prev,
            content: [...prev.content, ...response.data.content],
          }
        : data
    );
  };

  React.useEffect(() => {
    onFinish(initData);
  }, []);

  return (
    <React.Fragment>
      <Container className={styles.container}>
        <div className={styles.container__filter}>
          <Form
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              sortBy: orderByOptions[0].value,
              type: filterComicTypeOptions[0].value,
            }}
            className={styles.form}
          >
            <Form.Item<FormComicFilter>
              label={
                <Typography tag="span" fontSize="sm">
                  Comic title
                </Typography>
              }
              name="title"
              className={styles.form__item}
            >
              <Input placeholder="Naruto, Bleach, ..." />
            </Form.Item>

            <Form.Item<FormComicFilter>
              label={
                <Typography tag="span" fontSize="sm">
                  Sort by
                </Typography>
              }
              name="sortBy"
              className={styles.form__item}
            >
              <Select options={orderByOptions} />
            </Form.Item>

            <Form.Item<FormComicFilter>
              label={
                <Typography tag="span" fontSize="sm">
                  Comic type
                </Typography>
              }
              name="type"
              className={styles.form__item}
            >
              <Select options={filterComicTypeOptions} />
            </Form.Item>

            <Form.Item<FormComicFilter>
              label={
                <Typography tag="span" fontSize="sm">
                  From
                </Typography>
              }
              name="from"
              className={styles.form__item}
            >
              <InputNumber min={0} addonAfter={VND_CURRENCY} formatter={(value) => numberFormatter(value || 0)} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item<FormComicFilter>
              label={
                <Typography tag="span" fontSize="sm">
                  To
                </Typography>
              }
              name="to"
              className={styles.form__item}
            >
              <InputNumber min={0} addonAfter={VND_CURRENCY} formatter={(value) => numberFormatter(value || 0)} style={{ width: "100%" }} />
            </Form.Item>

            <div className="col-span-2 flex items-center">
              <Button type="primary" className="block w-full" htmlType="submit">
                Search
              </Button>
            </div>
          </Form>
        </div>

        <div className={styles.container__data}>
          {!data?.empty ? (
            data?.content.map((comic) => (
              <div key={comic.id} className={styles.container__data__item}>
                <CardComic {...comic} />
              </div>
            ))
          ) : (
            <div className={styles.container__data__empty}>
              <Empty />
            </div>
          )}
        </div>
      </Container>

      <Container className={styles.container__pagination}>
        {data?.totalPages && page < data.totalPages ? (
          <Button type="primary" onClick={onLoadMore}>
            Load more
          </Button>
        ) : null}
      </Container>
    </React.Fragment>
  );
};

export default User_ComicsModule;

"use client";

import { Button, Empty, Form, FormProps, Input, InputNumber, Select } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import CardComic from "@/components/CardComic";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { FILTER_COMIC_TYPE_OPTIONS, ORDER_BY_OPTIONS } from "@/constants/options";
import { VND_CURRENCY } from "@/constants/sign";
import { Comic, ComicStatus } from "@/types/data";
import { FormComicFilter } from "@/types/form";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { numberFormatter } from "@/utils/formatter";
import { fromObjetToQuery } from "@/utils/utils";

import styles from "./styles.module.scss";

const initData = {
  title: "",
  sortBy: ORDER_BY_OPTIONS[0].value,
  type: FILTER_COMIC_TYPE_OPTIONS[0].value,
  from: 0,
  to: 0,
};

const User_ComicsModule = () => {
  const [data, setData] = React.useState<BaseGetResponse<Comic[]> | null>(null);
  const [filter, setFilter] = React.useState<FormComicFilter>(initData);
  const [page, setPage] = React.useState(1);

  const onFinish: FormProps<FormComicFilter>["onFinish"] = async (values: FormComicFilter) => {
    const query = `/comics?pageNumber=1&size=6&status=${ComicStatus.APPROVED}&` + fromObjetToQuery(values, initData);
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>(query)).data;

    setPage(1);
    setData(data);
    setFilter(values);
  };

  const onLoadMore = async () => {
    const nextPage = page + 1;
    const query = `/comics?pageNumber=${nextPage}&size=6&` + fromObjetToQuery(filter, initData);
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>(query)).data;

    setPage(nextPage);
    setData((prev) =>
      prev
        ? {
            ...prev,
            content: [...prev.content, ...data.content],
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
              sortBy: ORDER_BY_OPTIONS[0].value,
              type: FILTER_COMIC_TYPE_OPTIONS[0].value,
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
              <Select options={ORDER_BY_OPTIONS} />
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
              <Select options={FILTER_COMIC_TYPE_OPTIONS} />
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

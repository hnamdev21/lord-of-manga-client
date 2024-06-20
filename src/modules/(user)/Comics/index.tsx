"use client";

import { Button, Form, FormProps, Input, InputNumber, Select } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import CardComic from "@/components/CardComic";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { FILTER_COMIC_TYPE_OPTIONS, ORDER_BY_OPTIONS } from "@/constants/options";
import { Comic } from "@/types/data";
import { FormComicFilter } from "@/types/form";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { numberFormatter } from "@/utils/formatter";
import { fromObjetToQuery } from "@/utils/utils";

const ignoreData = {
  sortBy: ORDER_BY_OPTIONS[0].value,
  type: FILTER_COMIC_TYPE_OPTIONS[0].value,
  from: 0,
  to: 0,
};

const ComicsModule = () => {
  const [data, setData] = React.useState<BaseGetResponse<Comic[]> | null>(null);
  const [filter, setFilter] = React.useState<FormComicFilter>({
    title: "",
    sortBy: ORDER_BY_OPTIONS[0].value,
    type: FILTER_COMIC_TYPE_OPTIONS[0].value,
    from: 0,
    to: 0,
  });
  const [page, setPage] = React.useState(1);

  const onFinish: FormProps<FormComicFilter>["onFinish"] = async (values: FormComicFilter) => {
    const query = `/comics?pageNumber=1&size=6&` + fromObjetToQuery(values, ignoreData);
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>(query)).data;

    setPage(1);
    setData(data);
    setFilter(values);
  };

  const onLoadMore = async () => {
    const nextPage = page + 1;
    const query = `/comics?pageNumber=${nextPage}&size=6&` + fromObjetToQuery(filter, ignoreData);
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
    onFinish(filter);
  }, []);

  return (
    <Container className="relative">
      <div className="col-span-3 sticky top-0">
        <Form
          onFinish={onFinish}
          autoComplete="off"
          className="rounded-2xl p-[2rem] bg-[var(--color-dark-gray)]"
          layout="vertical"
          initialValues={{
            sortBy: ORDER_BY_OPTIONS[0].value,
            type: FILTER_COMIC_TYPE_OPTIONS[0].value,
          }}
        >
          <Form.Item<FormComicFilter>
            label={
              <Typography className="span" fontSize="sm">
                Comic title
              </Typography>
            }
            name="title"
          >
            <Input placeholder={"Naruto, Bleach, ..."} />
          </Form.Item>

          <div className="flex gap-[2rem]">
            <Form.Item<FormComicFilter>
              label={
                <Typography className="span" fontSize="sm">
                  Sort by
                </Typography>
              }
              name="sortBy"
              className="flex-1"
            >
              <Select options={ORDER_BY_OPTIONS} />
            </Form.Item>

            <Form.Item<FormComicFilter>
              label={
                <Typography className="span" fontSize="sm">
                  Comic type
                </Typography>
              }
              name="type"
              className="flex-1"
            >
              <Select options={FILTER_COMIC_TYPE_OPTIONS} />
            </Form.Item>
          </div>

          <div className="flex gap-[2rem]">
            <Form.Item<FormComicFilter>
              label={
                <Typography className="span" fontSize="sm">
                  From
                </Typography>
              }
              name="from"
            >
              <InputNumber min={0} addonAfter="VND" formatter={(value) => numberFormatter(value || 0)} />
            </Form.Item>
            <Form.Item<FormComicFilter>
              label={
                <Typography className="span" fontSize="sm">
                  To
                </Typography>
              }
              name="to"
            >
              <InputNumber min={0} addonAfter="VND" formatter={(value) => numberFormatter(value || 0)} />
            </Form.Item>
          </div>

          <Button type="primary" className="block w-full mb-[1rem] bg-[var(--color-primary)]" htmlType="submit">
            Search
          </Button>
        </Form>
      </div>

      <div className="col-span-9 grid grid-cols-12 gap-[2rem]">
        {data?.content.map((comic) => (
          <div key={comic.id} className="col-span-2">
            <CardComic {...comic} />
          </div>
        ))}
      </div>

      <div className="col-start-4 col-span-9 flex justify-center">
        {data?.totalPages && page < data.totalPages && (
          <Button type="primary" className="bg-[var(--color-primary)]" onClick={onLoadMore}>
            Load more
          </Button>
        )}
      </div>
    </Container>
  );
};

export default ComicsModule;

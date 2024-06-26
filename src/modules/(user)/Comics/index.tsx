"use client";

import { Button, Empty, Form, FormProps, Input, InputNumber, Select } from "antd";
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
    const query = `/comics?pageNumber=1&size=6&status=APPROVE&` + fromObjetToQuery(values, ignoreData);
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
    <React.Fragment>
      <Container className="mb-[2rem]">
        <div className="col-span-12 row-span-1 sticky top-0">
          <Form
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              sortBy: ORDER_BY_OPTIONS[0].value,
              type: FILTER_COMIC_TYPE_OPTIONS[0].value,
            }}
          >
            <div className="w-full grid grid-cols-12 gap-[2rem]">
              <Form.Item<FormComicFilter>
                label={
                  <Typography className="span" fontSize="sm">
                    Comic title
                  </Typography>
                }
                name="title"
                className="col-span-2"
              >
                <Input placeholder="Naruto, Bleach, ..." />
              </Form.Item>

              <Form.Item<FormComicFilter>
                label={
                  <Typography className="span" fontSize="sm">
                    Sort by
                  </Typography>
                }
                name="sortBy"
                className="col-span-2"
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
                className="col-span-2"
              >
                <Select options={FILTER_COMIC_TYPE_OPTIONS} />
              </Form.Item>

              <Form.Item<FormComicFilter>
                label={
                  <Typography className="span" fontSize="sm">
                    From
                  </Typography>
                }
                name="from"
                className="col-span-2"
              >
                <InputNumber min={0} addonAfter="VND" formatter={(value) => numberFormatter(value || 0)} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item<FormComicFilter>
                label={
                  <Typography className="span" fontSize="sm">
                    To
                  </Typography>
                }
                name="to"
                className="col-span-2"
              >
                <InputNumber min={0} addonAfter="VND" formatter={(value) => numberFormatter(value || 0)} style={{ width: "100%" }} />
              </Form.Item>

              <div className="col-span-2 flex items-center">
                <Button type="primary" className="block w-full bg-[var(--color-primary)]" htmlType="submit">
                  Search
                </Button>
              </div>
            </div>
          </Form>
        </div>

        {!data?.empty ? (
          data?.content.map((comic) => (
            <div key={comic.id} className="col-span-2 h-[36rem]">
              <CardComic {...comic} />
            </div>
          ))
        ) : (
          <div className="col-span-12 flex justify-center">
            <Empty />
          </div>
        )}
      </Container>

      <Container className="mb-[2rem]">
        <div className="col-start-6 col-span-2 flex justify-center">
          {data?.totalPages && page < data.totalPages ? (
            <Button type="primary" className="bg-[var(--color-primary)]" onClick={onLoadMore}>
              Load more
            </Button>
          ) : null}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ComicsModule;

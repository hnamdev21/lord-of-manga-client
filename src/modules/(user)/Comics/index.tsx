"use client";

import { Button, Form, FormProps, Input, InputNumber, Select } from "antd";
import React from "react";

import CardComic from "@/components/CardComic";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { FILTER_COMIC_TYPE_OPTIONS, ORDER_BY_OPTIONS } from "@/constants/options";
import {} from "@/types/form";
import { numberFormatter } from "@/utils/formatter";

const ComicsModule = () => {
  const onFinish: FormProps["onFinish"] = async (_values: any) => {
    //
  };

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
          <Form.Item
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
            <Form.Item
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

            <Form.Item
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
            <Form.Item
              label={
                <Typography className="span" fontSize="sm">
                  From
                </Typography>
              }
              name="from"
            >
              <InputNumber min={0} addonAfter="VND" formatter={(value) => numberFormatter(value || 0)} />
            </Form.Item>
            <Form.Item
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
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="col-span-3">
            <CardComic />
          </div>
        ))}
      </div>

      <div className="col-start-4 col-span-9 flex justify-center">
        <Button type="primary" className="bg-[var(--color-primary)]">
          Load more
        </Button>
      </div>
    </Container>
  );
};

export default ComicsModule;

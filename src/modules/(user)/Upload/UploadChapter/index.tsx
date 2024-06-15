"use client";

import { Button, Form, FormProps, Input, InputNumber, Select, Switch, Upload } from "antd";
import { FieldNamesType } from "antd/es/cascader";
import React from "react";

import MultipleFileInput from "@/components/MultipleFileInput";
import Typography from "@/components/Typography";
import { CHAPTER_TYPE_OPTIONS } from "@/constants/options";
import { FormCreateChapter } from "@/types/form";
import { numberFormatter } from "@/utils/formatter";
import { getBase64 } from "@/utils/imageUtils";

import styles from "./styles.module.scss";

const UploadChapter = () => {
  const [form] = Form.useForm();

  const [disablePriceInput, setDisablePriceInput] = React.useState<boolean>(true);
  const [images, setImages] = React.useState<Array<string>>([]);

  const onFinish: FormProps<FormCreateChapter>["onFinish"] = async (_values: FormCreateChapter) => {
    //
  };

  return (
    <React.Fragment>
      <div className="grid grid-cols-12 gap-[2rem]">
        <Form
          layout="vertical"
          form={form}
          initialValues={{ type: CHAPTER_TYPE_OPTIONS[0].value, showComment: true }}
          onFinish={onFinish}
          className="col-start-5 col-span-4"
        >
          <div className="flex gap-[2rem]">
            <Form.Item<FormCreateChapter>
              label={
                <Typography className="span" fontSize="sm">
                  Title
                </Typography>
              }
              name="title"
              rules={[{ required: true, message: "Please enter chapter title" }]}
              className="flex-1"
            >
              <Input placeholder="Enter chapter title" />
            </Form.Item>

            <Form.Item<FormCreateChapter>
              label={
                <Typography className="span" fontSize="sm">
                  Comic
                </Typography>
              }
              name={"comicId"}
              rules={[{ required: true, message: "Please select a comic" }]}
              className="flex-1"
            >
              <Select placeholder="-- Select a comic --" options={[]} />
            </Form.Item>
          </div>

          <div className="flex gap-[2rem]">
            <Form.Item<FormCreateChapter>
              label={
                <Typography className="span" fontSize="sm">
                  Chapter type
                </Typography>
              }
              name={"type"}
              className="flex-1"
            >
              <Select
                allowClear
                id="type"
                options={CHAPTER_TYPE_OPTIONS}
                onChange={(value) => {
                  if (value === "PAID") {
                    setDisablePriceInput(false);
                  } else {
                    setDisablePriceInput(true);
                  }
                }}
              />
            </Form.Item>
            <Form.Item<FormCreateChapter>
              label={
                <Typography className="span" fontSize="sm">
                  Price
                </Typography>
              }
              name={"price"}
              className="flex-1"
            >
              <InputNumber addonAfter="VND" min={1_000} formatter={(value) => numberFormatter(value || 0)} disabled={disablePriceInput} />
            </Form.Item>
          </div>

          <Form.Item<FormCreateChapter> name={"showComment"} className="flex justify-center">
            <span className="flex items-center gap-[.5rem]">
              <Typography tag="span">Show comment</Typography>
              <Switch />
            </span>
          </Form.Item>

          <Form.Item<FormCreateChapter>>
            <div className="flex justify-center gap-[2rem]">
              <Upload
                beforeUpload={() => false}
                multiple={true}
                onChange={async (info) => {
                  const base64Images = await Promise.all(
                    info.fileList.map(async (file) => {
                      return await getBase64(file.originFileObj as FieldNamesType);
                    })
                  );

                  setImages([...images, ...base64Images]);
                }}
                showUploadList={false}
              >
                <Button>Add images</Button>
              </Upload>

              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      <div className={`${styles.previewImgs}`}>
        <MultipleFileInput images={images} setImages={setImages} />
      </div>
    </React.Fragment>
  );
};

export default UploadChapter;

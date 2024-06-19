"use client";

import { Button, Checkbox, Form, FormProps, Input, InputNumber, message, Select, Upload } from "antd";
import { FieldNamesType } from "antd/es/cascader";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import MultipleFileInput from "@/components/MultipleFileInput";
import Typography from "@/components/Typography";
import { CHAPTER_TYPE_OPTIONS } from "@/constants/options";
import { AuthContext } from "@/providers/AuthProvider";
import { Chapter, Comic } from "@/types/data";
import { FormCreateChapter } from "@/types/form";
import { BaseResponse } from "@/types/response";
import { numberFormatter } from "@/utils/formatter";
import { getBase64 } from "@/utils/imageUtils";

import styles from "./styles.module.scss";

type UploadChapterProps = {
  createdComics: Comic[];
};

const UploadChapter = ({ createdComics }: UploadChapterProps) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm();

  const createdComicOptions = React.useMemo(() => {
    return createdComics.map((comic) => ({ label: comic.title, value: comic.id }));
  }, [createdComics]);

  const [disablePriceInput, setDisablePriceInput] = React.useState<boolean>(true);
  const [files, setFiles] = React.useState<File[]>([]);
  const [images, setImages] = React.useState<Array<string>>([]);

  const onFinish: FormProps<FormCreateChapter>["onFinish"] = async (values: FormCreateChapter) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("comicId", values.comicId);
    formData.append("type", values.type);
    formData.append("showComment", values.showComment.toString());
    formData.append("price", (values.price || 0).toString());
    files.forEach((file) => {
      formData.append("files", file);
    });

    console.log({ ...values, files });
    const response = (
      await AXIOS_INSTANCE.post<BaseResponse<Chapter>>("/chapters", formData, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;

    if (response.code === "CREATED") {
      message.success("Chapter created successfully");
    }
  };

  const onComicChange = (comicId: string) => {
    const comic = createdComics.find((comic) => comic.id === comicId);
    if (comic?.type === "PAID_PER_CHAPTER") {
      setDisablePriceInput(false);
    } else {
      setDisablePriceInput(true);
    }
  };

  return (
    <React.Fragment>
      <div className="grid grid-cols-12 gap-[2rem]">
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            type: CHAPTER_TYPE_OPTIONS[0].value,
            showComment: true,
            comicId: createdComicOptions.length > 0 ? createdComicOptions[0].value : undefined,
          }}
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
              name="comicId"
              rules={[{ required: true, message: "Please select a comic" }]}
              className="flex-1"
            >
              <Select placeholder="-- Select a comic --" options={createdComicOptions} onChange={onComicChange} />
            </Form.Item>
          </div>

          <div className="flex gap-[2rem]">
            <Form.Item<FormCreateChapter>
              label={
                <Typography className="span" fontSize="sm">
                  Chapter type
                </Typography>
              }
              name="type"
              className="flex-1"
            >
              <Select
                allowClear
                id="type"
                options={CHAPTER_TYPE_OPTIONS}
                disabled={disablePriceInput}
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
              name="price"
              className="flex-1"
            >
              <InputNumber addonAfter="VND" min={1_000} formatter={(value) => numberFormatter(value || 0)} disabled={disablePriceInput} />
            </Form.Item>
          </div>

          <Form.Item<FormCreateChapter> name="showComment" valuePropName="checked" className="flex justify-center">
            <div className="w-full flex items-center justify-between">
              <Checkbox
                style={{
                  color: "var(--color-light)",
                }}
              >
                Show comment
              </Checkbox>
            </div>
          </Form.Item>

          <Form.Item<FormCreateChapter>>
            <div className="flex justify-center gap-[2rem]">
              <Upload
                beforeUpload={() => false}
                multiple={true}
                onChange={async (info) => {
                  const fileList: File[] = [];
                  const base64Images = await Promise.all(
                    info.fileList.map(async (file) => {
                      fileList.push(file.originFileObj as File);

                      return await getBase64(file.originFileObj as FieldNamesType);
                    })
                  );

                  console.log(fileList, base64Images);

                  setFiles([...files, ...fileList]);
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

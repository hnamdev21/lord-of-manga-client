"use client";

import { Checkbox, Form, FormProps, Input, InputNumber, message, Popover, Select, Upload } from "antd";
import { FieldNamesType } from "antd/es/cascader";
import React from "react";

import Button from "@/components/Button";
import MultipleFileInput from "@/components/MultipleFileInput";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import { chapterTypeOptions } from "@/constants/options";
import { VND_CURRENCY } from "@/constants/sign";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { ChapterAPI } from "@/services/apis/chapter";
import { Comic, ComicType } from "@/types/data";
import { FormCreateChapter } from "@/types/form";
import { numberFormatter } from "@/utils/formatter";
import { getBase64 } from "@/utils/imageUtils";

type UploadChapterProps = {
  createdComics: Comic[];
};

const UploadChapter = ({ createdComics }: UploadChapterProps) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormCreateChapter>();

  const createdComicOptions = React.useMemo(() => {
    return createdComics.map((comic) => ({ label: comic.title, value: comic.id }));
  }, [createdComics]);

  const [disablePriceInput, setDisablePriceInput] = React.useState<boolean>(true);
  const [files, setFiles] = React.useState<File[]>([]);
  const [images, setImages] = React.useState<Array<string>>([]);

  const onFinish: FormProps<FormCreateChapter>["onFinish"] = async (values: FormCreateChapter) => {
    const response = await ChapterAPI.createChapter({ formData: { ...values, files }, token: authContext.auth.token });

    if (response.code === StatusCode.CREATED) {
      message.success(Notification.createSuccess("Chapter"));
      form.resetFields();
      setFiles([]);
      setImages([]);
    }
  };

  const onComicChange = (comicId: string) => {
    const comic = createdComics.find((comic) => comic.id === comicId);
    if (comic?.type === ComicType.PAID_PER_CHAPTER) {
      setDisablePriceInput(false);
    } else {
      setDisablePriceInput(true);
    }
  };

  return (
    <React.Fragment>
      <div className="grid grid-cols-12 gap-[2rem] h-[60%]">
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            type: chapterTypeOptions[0].value,
            showComment: true,
            comicId: createdComicOptions.length > 0 ? createdComicOptions[0].value : undefined,
            price: disablePriceInput ? 0 : 1_000,
          }}
          onFinish={onFinish}
          className="col-start-5 col-span-4"
        >
          <div className="flex gap-[2rem]">
            <Form.Item<FormCreateChapter>
              label={
                <Typography tag="span" fontSize="sm">
                  Title
                </Typography>
              }
              name="title"
              rules={[{ required: true, message: Notification.pleaseEnter("chapter title") }]}
              className="flex-1"
            >
              <Input />
            </Form.Item>

            <Form.Item<FormCreateChapter>
              label={
                <Typography tag="span" fontSize="sm">
                  Comic
                </Typography>
              }
              name="comicId"
              rules={[{ required: true, message: Notification.pleaseSelect("comic") }]}
              className="flex-1"
            >
              <Select placeholder="-- Select a comic --" options={createdComicOptions} onChange={onComicChange} />
            </Form.Item>
          </div>

          <div className="flex gap-[2rem]">
            <Form.Item<FormCreateChapter>
              label={
                <Typography tag="span" fontSize="sm">
                  Chapter type
                </Typography>
              }
              name="type"
              className="flex-1"
            >
              <Select
                allowClear
                id="type"
                options={chapterTypeOptions}
                disabled={disablePriceInput}
                onChange={(value) => {
                  if (value === "PAID") {
                    form.setFieldsValue({ price: 1_000 });
                    setDisablePriceInput(false);
                  } else {
                    form.setFieldsValue({ price: 0 });
                    setDisablePriceInput(true);
                  }
                }}
              />
            </Form.Item>
            <Form.Item<FormCreateChapter>
              label={
                <Typography tag="span" fontSize="sm">
                  Price
                </Typography>
              }
              name="price"
              className="flex-1"
            >
              <InputNumber
                addonAfter={VND_CURRENCY}
                min={disablePriceInput ? 0 : 1_000}
                formatter={(value) => numberFormatter(value || 0)}
                disabled={disablePriceInput}
              />
            </Form.Item>
          </div>

          <Form.Item<FormCreateChapter> name="showComment" valuePropName="checked" className="flex justify-center">
            <div className="w-full flex items-center justify-between">
              <Checkbox>Show comment</Checkbox>
            </div>
          </Form.Item>

          <Form.Item<FormCreateChapter>>
            <div className="flex justify-center gap-[2rem]">
              <Popover
                content={
                  <React.Fragment>
                    <Typography tag="span" fontSize="sm">
                      For easier upload, you can select multiple images at once
                    </Typography>
                    <Typography tag="span" fontSize="sm">
                      The image name should be in order (1, 2, 3, ...)
                    </Typography>
                    <Typography tag="span" fontSize="sm">
                      Supported formats: .jpg, .jpeg, .png
                    </Typography>
                  </React.Fragment>
                }
              >
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

                    setFiles([...files, ...fileList]);
                    setImages([...images, ...base64Images]);
                  }}
                  showUploadList={false}
                >
                  <Button element="button" type="button" variant="outline">
                    Add images
                  </Button>
                </Upload>
              </Popover>

              <Button element="button" type="submit">
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      <MultipleFileInput images={images} setImages={setImages} />
    </React.Fragment>
  );
};

export default UploadChapter;

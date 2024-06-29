"use client";

import { Divider, Form, FormProps, Input, InputNumber, InputRef, message, Select, Space, Upload } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import React from "react";
import { FaUpload } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import NOTIFICATION from "@/constants/notification";
import { COMIC_TYPE_OPTIONS } from "@/constants/options";
import { VND_CURRENCY } from "@/constants/sign";
import { AuthContext } from "@/providers/AuthProvider";
import { Category, Comic, Tag } from "@/types/data";
import { FormCreateComic } from "@/types/form";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { numberFormatter } from "@/utils/formatter";

const checkFile = (resolve: any, file: RcFile) => {
  const isLt5M = file.size / 1024 / 1024 <= 2;
  if (!isLt5M) {
    return;
  }

  resolve(true);
};

const UploadComic = () => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormCreateComic>();
  const { data } = useQuery(["categories", "tags"], async () => {
    const [responseCategories, responseTags] = await Promise.all([
      AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Category[]>>>("/categories"),
      AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Tag[]>>>("/tags"),
    ]);

    const categories = responseCategories.data.data.content;
    const tags = responseTags.data.data.content;

    const categoryOptions = categories.map((category) => ({ label: category.name, value: category.name }));
    const tagOptions = tags.map((tag) => ({ label: tag.name, value: tag.name }));

    return { categories: categoryOptions, tags: tagOptions };
  });

  const inputRef = React.useRef<InputRef>(null);

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [disablePriceInput, setDisablePriceInput] = React.useState<boolean>(true);

  const onFinish: FormProps<FormCreateComic>["onFinish"] = async (values: FormCreateComic) => {
    const response = (
      await AXIOS_INSTANCE.post<BaseResponse<Comic>>(
        "/comics",
        {
          ...values,
          cover: (values.cover[0] as UploadFile).originFileObj,
          thumbnail: (values.thumbnail[0] as UploadFile).originFileObj,
        },
        {
          headers: {
            Authorization: `Bearer ${authContext?.auth.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
    ).data;

    if (response.code === "CREATED") {
      message.success(NOTIFICATION.SUCCESS_CREATED("Comic"));
      form.resetFields();
      setSearchValue("");
      setDisablePriceInput(true);
    }
  };

  const addItem = (_e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    //
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <div className="grid grid-cols-12 gap-[2rem]">
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{ type: COMIC_TYPE_OPTIONS[0].value, price: disablePriceInput ? 0 : 1_000 }}
        className="col-start-5 col-span-4"
      >
        <div className="flex gap-[2rem]">
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Title
              </Typography>
            }
            name="title"
            rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("comic title") }]}
            className="flex-1"
          >
            <Input />
          </Form.Item>
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Author name
              </Typography>
            }
            name="author"
            rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("author name") }]}
            className="flex-1"
          >
            <Input />
          </Form.Item>
        </div>

        <div className="flex gap-[2rem]">
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Categories
              </Typography>
            }
            name="categoryNames"
            rules={[{ required: true, message: NOTIFICATION.PLEASE_SELECT("categories") }]}
            className="flex-1"
          >
            <Select mode="multiple" allowClear id="categories" placeholder="-- Select categories --" options={data?.categories} />
          </Form.Item>
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Tags
              </Typography>
            }
            name="tagNames"
            className="flex-1"
          >
            <Select
              placeholder="-- Select tags --"
              allowClear
              mode="multiple"
              showSearch={false}
              searchValue={searchValue}
              options={data?.tags}
              dropdownRender={(menu) => (
                <React.Fragment>
                  <Space>
                    <Input
                      placeholder="Search or add new tag"
                      ref={inputRef}
                      value={searchValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                      allowClear
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button element="button" type="button" size="xs" onClick={addItem}>
                      Add
                    </Button>
                  </Space>
                  <Divider className="mt-[.5rem]" />
                  {menu}
                </React.Fragment>
              )}
            />
          </Form.Item>
        </div>

        <div className="flex gap-[2rem]">
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Comic type
              </Typography>
            }
            name="type"
            className="flex-1"
          >
            <Select
              allowClear
              id="type"
              options={COMIC_TYPE_OPTIONS}
              onChange={(value) => {
                if (value === "PAID_ONCE") {
                  form.setFieldsValue({ price: 1_000 });
                  setDisablePriceInput(false);
                } else {
                  form.setFieldsValue({ price: 0 });
                  setDisablePriceInput(true);
                }
              }}
            />
          </Form.Item>
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Price
              </Typography>
            }
            name="price"
            className="flex-1"
          >
            <InputNumber
              disabled={disablePriceInput}
              addonAfter={VND_CURRENCY}
              min={disablePriceInput ? 0 : 1_000}
              formatter={(value) => numberFormatter(value || 0)}
              className="w-full"
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Description
              </Typography>
            }
            name={"description"}
            rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("description") }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-[2rem]">
            <Form.Item<FormCreateComic> valuePropName="fileList" getValueFromEvent={normFile} name="cover">
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => {
                  return new Promise((resolve) => {
                    checkFile(resolve, file);
                  });
                }}
                accept=".jpg, .jpeg, .png"
              >
                <Button
                  element="button"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => e.preventDefault()}
                  className="flex gap-[.5rem] items-center"
                >
                  <FaUpload /> Upload cover
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item<FormCreateComic> valuePropName="fileList" getValueFromEvent={normFile} name="thumbnail">
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => {
                  return new Promise((resolve) => {
                    checkFile(resolve, file);
                  });
                }}
                accept=".jpg, .jpeg, .png"
              >
                <Button
                  element="button"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => e.preventDefault()}
                  className="flex gap-[.5rem] items-center"
                >
                  <FaUpload /> Upload thumbnail
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <Form.Item<FormCreateComic>>
            <Button element="button" type="submit" className="block mx-auto">
              Create
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UploadComic;

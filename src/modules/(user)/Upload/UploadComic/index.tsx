"use client";

import { Button, Divider, Form, FormProps, Input, InputNumber, InputRef, Select, Space, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import React from "react";

import Typography from "@/components/Typography";
import { COMIC_TYPE_OPTIONS } from "@/constants/options";
import { FormCreateComic } from "@/types/form";
import { numberFormatter } from "@/utils/formatter";

const checkFile = (resolve: any, file: RcFile) => {
  const isLt5M = file.size / 1024 / 1024 <= 2;
  if (!isLt5M) {
    return;
  }

  resolve(true);
};

const UploadComic = () => {
  const inputRef = React.useRef<InputRef>(null);

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [disablePriceInput, setDisablePriceInput] = React.useState<boolean>(true);

  const onFinish: FormProps<FormCreateComic>["onFinish"] = (_values: FormCreateComic) => {
    //
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
      <Form layout="vertical" onFinish={onFinish} initialValues={{ type: COMIC_TYPE_OPTIONS[0].value }} className="col-start-5 col-span-4">
        <div className="flex gap-[2rem]">
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Title
              </Typography>
            }
            name="title"
            rules={[{ required: true, message: "Please enter comic title" }]}
            className="flex-1"
          >
            <Input placeholder="Enter comic title" />
          </Form.Item>
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Author name
              </Typography>
            }
            name="author"
            rules={[{ required: true, message: "Please enter author name" }]}
            className="flex-1"
          >
            <Input placeholder="Author name" />
          </Form.Item>
        </div>

        <div className="flex gap-[2rem]">
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Categories
              </Typography>
            }
            name={"categories"}
            rules={[{ required: true, message: "Please select categories" }]}
            className="flex-1"
          >
            <Select mode="multiple" allowClear id="categories" placeholder="-- Select categories --" options={[]} />
          </Form.Item>
          <Form.Item<FormCreateComic>
            label={
              <Typography className="span" fontSize="sm">
                Tags
              </Typography>
            }
            name={"tags"}
            className="flex-1"
          >
            <Select
              placeholder="-- Select tags --"
              allowClear
              mode="multiple"
              showSearch={false}
              searchValue={searchValue}
              options={[]}
              dropdownRender={(menu) => (
                <>
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Search or add new tag"
                      ref={inputRef}
                      value={searchValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                      allowClear
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button type="primary" danger size={"middle"} onClick={addItem}>
                      Add
                    </Button>
                  </Space>
                  <Divider style={{ margin: "8px 0" }} />
                  {menu}
                </>
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
            name={"type"}
            className="flex-1"
          >
            <Select
              allowClear
              id="type"
              options={COMIC_TYPE_OPTIONS}
              onChange={(value) => {
                if (value === "PAID_ONCE") {
                  setDisablePriceInput(false);
                } else {
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
            name={"price"}
            className="flex-1"
          >
            <InputNumber disabled={disablePriceInput} addonAfter="VND" min={1_000} formatter={(value) => numberFormatter(value || 0)} />
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
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <div className={"grid grid-cols-2 gap-[2rem]"}>
            <Form.Item<FormCreateComic>
              label={
                <Typography className="span" fontSize="sm">
                  Cover
                </Typography>
              }
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="cover"
            >
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
                <Button onClick={(e) => e.preventDefault()}>Upload cover</Button>
              </Upload>
            </Form.Item>
            <Form.Item<FormCreateComic>
              label={
                <Typography className="span" fontSize="sm">
                  Thumbnail
                </Typography>
              }
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="thumbnail"
            >
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
                <Button onClick={(e) => e.preventDefault()}>Upload thumbnail</Button>
              </Upload>
            </Form.Item>
          </div>

          <Form.Item<FormCreateComic>>
            <Button type="primary" htmlType="submit" className="block w-full">
              Create
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UploadComic;

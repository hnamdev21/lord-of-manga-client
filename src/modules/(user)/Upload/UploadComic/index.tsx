"use client";

import { Button, Divider, Form, Input, InputNumber, InputRef, Select, Space, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import React from "react";

const checkFile = (resolve: any, file: RcFile) => {
  const isLt5M = file.size / 1024 / 1024 <= 2;
  if (!isLt5M) {
    return;
  }

  resolve(true);
};

const UploadComic = () => {
  const inputRef = React.useRef<InputRef>(null);

  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [disablePriceInput, setDisablePriceInput] = React.useState<boolean>(true);

  const onFinish = (values: any) => {
    //
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
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
      <Form layout="vertical" form={form} onFinish={onFinish} className="col-start-5 col-span-4">
        <div className="flex gap-[2rem]">
          <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter comic title" }]} className="flex-1">
            <Input placeholder="Enter comic title" />
          </Form.Item>
          <Form.Item label="Author name" name="author" rules={[{ required: true, message: "Please enter author name" }]} className="flex-1">
            <Input placeholder="Author name" />
          </Form.Item>
        </div>

        <div className="flex gap-[2rem]">
          <Form.Item label="Categories" name={"categories"} rules={[{ required: true, message: "Please select categories" }]} className="flex-1">
            <Select mode="multiple" allowClear id="categories" style={{ width: "100%" }} placeholder="-- Select categories --" options={[]} />
          </Form.Item>
          <Form.Item label="Tags" name={"tags"} className="flex-1">
            <Select
              style={{ width: "100%" }}
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
          <Form.Item label="Comic type" name={"type"} className="flex-1">
            <Select allowClear id="type" style={{ width: "100%" }} defaultActiveFirstOption options={[]} />
          </Form.Item>
          <Form.Item label="Price" name={"price"} className="flex-1">
            <InputNumber addonAfter="VND" min={0} style={{ width: "100%" }} disabled={false} />
          </Form.Item>
        </div>
        <div>
          <Form.Item label={"Description"} name={"description"} rules={[{ required: true, message: "Please enter description" }]}>
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <div className={"grid grid-cols-2 gap-[2rem]"}>
            <Form.Item label="Cover" valuePropName="fileList" getValueFromEvent={normFile} name="cover">
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
            <Form.Item label="Thumbnail" valuePropName="fileList" getValueFromEvent={normFile} name="thumbnail">
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

          <Form.Item>
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
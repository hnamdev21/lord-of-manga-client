import { Button as AntdButton, Divider, Form, FormProps, Input, InputNumber, InputRef, message, Select, Space, Upload } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Typography from "@/components/Typography";
import NOTIFICATION from "@/constants/notification";
import { COMIC_TYPE_OPTIONS } from "@/constants/options";
import { VND_CURRENCY } from "@/constants/sign";
import { AuthContext } from "@/providers/AuthProvider";
import { Category, Comic, Tag } from "@/types/data";
import { FormUpdateComic } from "@/types/form";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { numberFormatter } from "@/utils/formatter";

type FormUpdateProps = {
  comic: Comic;
};

const checkFile = (resolve: any, file: RcFile) => {
  const isLt5M = file.size / 1024 / 1024 <= 2;
  if (!isLt5M) {
    return;
  }

  resolve(true);
};

const FormUpdate = ({ comic }: FormUpdateProps) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateComic>();

  const inputRef = React.useRef<InputRef>(null);

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [disablePriceInput, setDisablePriceInput] = React.useState<boolean>(true);

  const { data: categoryAndTagData } = useQuery(["edit-comic", "categories", "tags"], async () => {
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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  const onFinish: FormProps<FormUpdateComic>["onFinish"] = async (values: FormUpdateComic) => {
    const response = (
      await AXIOS_INSTANCE.put<BaseResponse<Comic>>(
        "/comics/" + values.id,
        {
          ...values,
          cover: (values.cover?.[0] as UploadFile)?.originFileObj,
          thumbnail: (values.thumbnail?.[0] as UploadFile)?.originFileObj,
        },
        {
          headers: {
            Authorization: `Bearer ${authContext?.auth.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
    ).data;

    if (response.code === "OK") {
      message.success(NOTIFICATION.SUCCESS_UPDATED("Comic"));
      setSearchValue("");
      setDisablePriceInput(true);
    }
  };

  const addItem = (_e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    //
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={{
        type: comic.type,
        price: comic.price,
        id: comic.id,
        title: comic.title,
        description: comic.description,
        author: comic.author,
        categoryNames: comic.categories.map((category) => category.name),
        tagNames: comic.tags.map((tag) => tag.name),
      }}
    >
      <div className="flex gap-[2rem]">
        <Form.Item<FormUpdateComic>
          label={
            <Typography tag="span" fontSize="sm">
              Title
            </Typography>
          }
          name="title"
          rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("comic title") }]}
          className="flex-1"
        >
          <Input />
        </Form.Item>
        <Form.Item<FormUpdateComic>
          label={
            <Typography tag="span" fontSize="sm">
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
        <Form.Item<FormUpdateComic>
          label={
            <Typography tag="span" fontSize="sm">
              Categories
            </Typography>
          }
          name="categoryNames"
          rules={[{ required: true, message: NOTIFICATION.PLEASE_SELECT("categories") }]}
          className="flex-1"
        >
          <Select mode="multiple" allowClear id="categories" placeholder="-- Select categories --" options={categoryAndTagData?.categories} />
        </Form.Item>
        <Form.Item<FormUpdateComic>
          label={
            <Typography tag="span" fontSize="sm">
              Tags
            </Typography>
          }
          name="tagNames"
          className="flex-1"
          rules={[{ required: true, message: NOTIFICATION.PLEASE_SELECT("tags") }]}
        >
          <Select
            placeholder="-- Select tags --"
            allowClear
            mode="multiple"
            showSearch={false}
            searchValue={searchValue}
            options={categoryAndTagData?.tags}
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
                  <AntdButton type="primary" danger size="middle" onClick={addItem}>
                    Add
                  </AntdButton>
                </Space>
                <Divider style={{ margin: ".5rem 0" }} />
                {menu}
              </React.Fragment>
            )}
          />
        </Form.Item>
      </div>

      <div className="flex gap-[2rem]">
        <Form.Item<FormUpdateComic>
          label={
            <Typography tag="span" fontSize="sm">
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
              if (value === COMIC_TYPE_OPTIONS[1].value) {
                form.setFieldsValue({ price: 1_000 });
                setDisablePriceInput(false);
              } else {
                form.setFieldsValue({ price: 0 });
                setDisablePriceInput(true);
              }
            }}
          />
        </Form.Item>
        <Form.Item<FormUpdateComic>
          label={
            <Typography tag="span" fontSize="sm">
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
        <Form.Item<FormUpdateComic>
          label={
            <Typography tag="span" fontSize="sm">
              Description
            </Typography>
          }
          name="description"
          rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("description") }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <div className="grid grid-cols-2 gap-[2rem]">
          <Form.Item<FormUpdateComic>
            label={
              <Typography tag="span" fontSize="sm">
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
              <AntdButton onClick={(e) => e.preventDefault()}>Upload cover</AntdButton>
            </Upload>
          </Form.Item>
          <Form.Item<FormUpdateComic>
            label={
              <Typography tag="span" fontSize="sm">
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
              <AntdButton onClick={(e) => e.preventDefault()}>Upload thumbnail</AntdButton>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item<FormUpdateComic>>
          <AntdButton type="primary" htmlType="submit" className="block w-full">
            Save
          </AntdButton>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormUpdate;

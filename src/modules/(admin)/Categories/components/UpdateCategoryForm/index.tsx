import { Form, Input, message } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { Category } from "@/types/data";
import { FormUpdateCategory } from "@/types/form";
import { BaseResponse } from "@/types/response";

type Props = {
  category: Category;
  refreshData: () => void;
};

const UpdateCategoryForm = ({ category, refreshData }: Props) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateCategory>();

  const onFinish = async (values: FormUpdateCategory) => {
    const response = (
      await AXIOS_INSTANCE.put<BaseResponse<boolean>>(`/categories/${category.id}`, values, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (response.code === StatusCode.OK) {
      refreshData();
      message.success(Notification.updateSuccess("Category"));
    }
  };

  React.useEffect(() => {
    form.setFieldsValue({
      name: category.name,
    });
  }, [category]);

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item<FormUpdateCategory>
        name="name"
        rules={[
          {
            required: true,
            message: Notification.pleaseEnter("category name"),
          },
        ]}
      >
        <Input placeholder="Category name" />
      </Form.Item>

      <div className="w-full flex justify-end">
        <Button element="button" type="submit" color="danger" variant="solid">
          Edit
        </Button>
      </div>
    </Form>
  );
};

export default UpdateCategoryForm;

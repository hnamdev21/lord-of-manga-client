import { Form, Input, message, Modal } from "antd";
import React from "react";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { CategoryAPI } from "@/services/apis/category";
import { Category } from "@/types/data";
import { FormUpdateCategory } from "@/types/form";

type Props = {
  category: Category;
  refreshData: () => void;
};

const UpdateCategoryForm = ({ category, refreshData }: Props) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateCategory>();

  if (!authContext) return null;

  const onFinish = async (values: FormUpdateCategory) => {
    const response = await CategoryAPI.updateCategory({
      id: category.id,
      formData: values,
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.OK) {
      refreshData();
      Modal.destroyAll();
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

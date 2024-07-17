import { Form, FormProps, Input, message, Modal } from "antd";
import React from "react";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { CategoryAPI } from "@/services/apis/category";
import { FormCreateCategory } from "@/types/form";

type Props = {
  refreshData: () => void;
};

const CreateCategoryForm = ({ refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  const onFinish: FormProps<FormCreateCategory>["onFinish"] = async (values: FormCreateCategory) => {
    const response = await CategoryAPI.createCategory({
      formData: values,
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.CREATED) {
      refreshData();
      Modal.destroyAll();
      message.success(Notification.addSuccess("Category"));
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item<FormCreateCategory>
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
          Create
        </Button>
      </div>
    </Form>
  );
};

export default CreateCategoryForm;

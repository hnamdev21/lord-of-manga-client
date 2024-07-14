import { Form, Input, message } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { FormCreateCategory } from "@/types/form";
import { BaseResponse } from "@/types/response";

type Props = {
  refreshData: () => void;
};

const CreateCategoryForm = ({ refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  const onFinish = async (values: FormCreateCategory) => {
    const response = (
      await AXIOS_INSTANCE.post<BaseResponse<boolean>>(`/categories`, values, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (response.code === StatusCode.CREATED) {
      refreshData();
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

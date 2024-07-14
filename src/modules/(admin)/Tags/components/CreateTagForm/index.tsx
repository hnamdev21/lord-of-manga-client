import { Form, Input, message } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { FormCreateTag } from "@/types/form";
import { BaseResponse } from "@/types/response";

type Props = {
  refreshData: () => void;
};

const CreateTagForm = ({ refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  const onFinish = async (values: FormCreateTag) => {
    const response = (
      await AXIOS_INSTANCE.post<BaseResponse<boolean>>(`/tags`, values, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (response.code === StatusCode.CREATED) {
      refreshData();
      message.success(Notification.addSuccess("Tag"));
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item<FormCreateTag>
        name="name"
        rules={[
          {
            required: true,
            message: Notification.pleaseEnter("tag name"),
          },
        ]}
      >
        <Input placeholder="Tag name" />
      </Form.Item>

      <div className="w-full flex justify-end">
        <Button element="button" type="submit" color="danger" variant="solid">
          Create
        </Button>
      </div>
    </Form>
  );
};

export default CreateTagForm;

import { Form, Input, message, Modal } from "antd";
import React from "react";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { TagAPI } from "@/services/apis/tag";
import { FormCreateTag } from "@/types/form";

type Props = {
  refreshData: () => void;
};

const CreateTagForm = ({ refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  const onFinish = async (values: FormCreateTag) => {
    const response = await TagAPI.createTag({
      formData: values,
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.CREATED) {
      refreshData();
      Modal.destroyAll();
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

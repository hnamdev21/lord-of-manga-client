import { Form, FormProps, Input, message, Modal } from "antd";
import React from "react";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { TagAPI } from "@/services/apis/tag";
import { Tag } from "@/types/data";
import { FormUpdateTag } from "@/types/form";

type Props = {
  tag: Tag;
  refreshData: () => void;
};

const UpdateTagForm = ({ tag, refreshData }: Props) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateTag>();

  const onFinish: FormProps<FormUpdateTag>["onFinish"] = async (values: FormUpdateTag) => {
    const response = await TagAPI.updateTag({
      id: tag.id,
      formData: values,
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.OK) {
      refreshData();
      Modal.destroyAll();
      message.success(Notification.updateSuccess("Tag"));
    }
  };

  React.useEffect(() => {
    form.setFieldsValue({
      name: tag.name,
    });
  }, [tag]);

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item<FormUpdateTag>
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
          Edit
        </Button>
      </div>
    </Form>
  );
};

export default UpdateTagForm;

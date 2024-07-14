import { Form, Input, message } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { Tag } from "@/types/data";
import { FormUpdateTag } from "@/types/form";
import { BaseResponse } from "@/types/response";

type Props = {
  tag: Tag;
  refreshData: () => void;
};

const UpdateTagForm = ({ tag, refreshData }: Props) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateTag>();

  const onFinish = async (values: FormUpdateTag) => {
    const response = (
      await AXIOS_INSTANCE.put<BaseResponse<Tag>>(`/tags/${tag.id}`, values, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (response.code === StatusCode.OK) {
      refreshData();
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

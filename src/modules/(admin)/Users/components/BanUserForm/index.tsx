import { Form, FormProps, Input, message, Modal } from "antd";
import React from "react";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { AdminAPI } from "@/services/apis/admin";
import { User } from "@/types/data";
import { FormBanUser } from "@/types/form";

type Props = {
  user: User;
  refreshData: () => void;
};

const BanUserForm = ({ user, refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  if (!authContext) return null;

  const onFinish: FormProps<FormBanUser>["onFinish"] = async (values: FormBanUser) => {
    const response = await AdminAPI.banUser({ id: user.id, formData: values, token: authContext.auth.token });

    if (response.code === StatusCode.OK) {
      refreshData();
      Modal.destroyAll();
      message.success("User has been banned");
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item<FormBanUser> name="bannedReason" rules={[{ required: true, message: Notification.pleaseEnter("banned reason") }]}>
        <Input placeholder="Banned reason" />
      </Form.Item>

      <div className="w-full flex justify-end">
        <Button element="button" type="submit" color="danger" variant="solid">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default BanUserForm;

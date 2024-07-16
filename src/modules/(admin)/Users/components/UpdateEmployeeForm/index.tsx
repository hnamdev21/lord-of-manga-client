import { Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useQuery } from "react-query";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import { genderOptions } from "@/constants/options";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { AdminAPI } from "@/services/apis/admin";
import AXIOS_INSTANCE from "@/services/instance";
import { Permission, User } from "@/types/data";
import { FormUpdateEmployee } from "@/types/form";
import { BaseGetResponse, BaseResponse } from "@/types/response";

type Props = {
  user: User;
  refreshData: () => void;
};

const UpdateEmployeeForm = ({ user, refreshData }: Props) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateEmployee>();

  if (!authContext) return null;

  const { data: roles } = useQuery(["admin", "roles"], async () => {
    const response = (
      await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Permission[]>>>(`/roles?size=9999`, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    return response.data.content;
  });

  const roleOptions = React.useMemo(
    () =>
      roles?.map((role) => ({
        label: role.name,
        value: role.id,
      })) || [],
    [roles]
  );

  const onFinish = async (values: FormUpdateEmployee) => {
    const response = await AdminAPI.updateEmployee({
      id: user.id,
      formData: values,
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.OK) {
      refreshData();
      Modal.destroyAll();
      message.success(Notification.updateSuccess("Employee"));
    }
  };

  React.useEffect(() => {
    form.setFieldsValue({
      ...user,
      roleIds: user.roles.map((role) => role.id),
    });
  }, [user]);

  return (
    <Form onFinish={onFinish} form={form}>
      <div className="flex gap-[1rem]">
        <Form.Item<FormUpdateEmployee> name="fullName" rules={[{ required: true, message: Notification.pleaseEnter("full name") }]} className="flex-1">
          <Input placeholder="Full name" />
        </Form.Item>
        <Form.Item<FormUpdateEmployee> name="gender" rules={[{ required: true, message: Notification.pleaseSelect("gender") }]} className="w-[40%]">
          <Select options={genderOptions} />
        </Form.Item>
      </div>

      <Form.Item<FormUpdateEmployee> name="username" rules={[{ required: true, message: Notification.pleaseEnter("username") }]}>
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item<FormUpdateEmployee>
        name="email"
        rules={[
          { required: true, message: Notification.pleaseEnter("email") },
          {
            type: "email",
            message: Notification.invalid("email"),
          },
        ]}
        extra={
          <Typography fontSize="sm" italic>
            System will send an email to this address to receive the password
          </Typography>
        }
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item<FormUpdateEmployee> name="roleIds" rules={[{ required: true, message: Notification.pleaseSelect("roles") }]}>
        <Select mode="multiple" allowClear id="roleIds" placeholder="-- Select roles --" options={roleOptions} />
      </Form.Item>

      <div className="w-full flex justify-end">
        <Button element="button" type="submit" color="danger" variant="solid">
          Edit
        </Button>
      </div>
    </Form>
  );
};

export default UpdateEmployeeForm;

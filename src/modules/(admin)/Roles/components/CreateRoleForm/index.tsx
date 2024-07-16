import { Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useQuery } from "react-query";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import AXIOS_INSTANCE from "@/services/instance";
import { Permission } from "@/types/data";
import { FormCreateRole } from "@/types/form";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { toUpperCaseWithUnderscores } from "@/utils/formatter";

type Props = {
  refreshData: () => void;
};

const CreateRoleForm = ({ refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  const { data: permissions } = useQuery("permissions", async () => {
    const response = (
      await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Permission[]>>>(`/permissions?size=9999`, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    return response.data.content;
  });

  const permissionOptions = React.useMemo(
    () =>
      permissions?.map((permission) => ({
        label: permission.name,
        value: permission.id,
      })) || [],
    [permissions]
  );

  const onFinish = async (values: FormCreateRole) => {
    const response = (
      await AXIOS_INSTANCE.post<BaseResponse<boolean>>(
        `/roles`,
        { ...values, value: toUpperCaseWithUnderscores(values.name) },
        {
          headers: {
            Authorization: `Bearer ${authContext?.auth.token}`,
          },
        }
      )
    ).data;

    if (response.code === StatusCode.CREATED) {
      refreshData();
      Modal.destroyAll();
      message.success(Notification.addSuccess("Role"));
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item<FormCreateRole>
        name="name"
        rules={[
          {
            required: true,
            message: Notification.pleaseEnter("role name"),
          },
        ]}
      >
        <Input placeholder="Role name" />
      </Form.Item>

      <Form.Item<FormCreateRole>
        name="description"
        rules={[
          {
            required: true,
            message: Notification.pleaseEnter("description"),
          },
        ]}
      >
        <Input placeholder="Description" />
      </Form.Item>

      <Form.Item<FormCreateRole> name="permissionIds" rules={[{ required: true, message: Notification.pleaseSelect("permissions") }]}>
        <Select mode="multiple" allowClear id="permissionIds" placeholder="-- Select permissions --" options={permissionOptions} />
      </Form.Item>

      <div className="w-full flex justify-end">
        <Button element="button" type="submit" color="danger" variant="solid">
          Create
        </Button>
      </div>
    </Form>
  );
};

export default CreateRoleForm;

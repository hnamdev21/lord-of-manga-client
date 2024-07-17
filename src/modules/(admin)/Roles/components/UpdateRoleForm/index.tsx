import { Form, FormProps, Input, message, Modal, Select } from "antd";
import React from "react";
import { useQuery } from "react-query";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { PermissionAPI } from "@/services/apis/permission";
import { RoleAPI } from "@/services/apis/role";
import { Role } from "@/types/data";
import { FormUpdateRole } from "@/types/form";
import { toUpperCaseWithUnderscores } from "@/utils/formatter";

type Props = {
  role: Role;
  refreshData: () => void;
};

const UpdateRoleForm = ({ role, refreshData }: Props) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateRole>();

  const { data: permissions } = useQuery("permissions", async () => {
    const response = await PermissionAPI.getAllPermissions({
      params: {
        pageNumber: 1,
        size: 9999,
      },
    });

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

  const onFinish: FormProps<FormUpdateRole>["onFinish"] = async (values: FormUpdateRole) => {
    const response = await RoleAPI.updateRole({
      id: role.id,
      formData: {
        ...values,
        value: toUpperCaseWithUnderscores(values.name),
      },
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.OK) {
      refreshData();
      Modal.destroyAll();
      message.success(Notification.updateSuccess("Role"));
    }
  };

  React.useEffect(() => {
    form.setFieldsValue({
      ...role,
      permissionIds: role.permissions.map((permission) => permission.id),
    });
  }, [role]);

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item<FormUpdateRole>
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

      <Form.Item<FormUpdateRole>
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

      <Form.Item<FormUpdateRole> name="permissionIds" rules={[{ required: true, message: Notification.pleaseSelect("permissions") }]}>
        <Select mode="multiple" allowClear id="permissionIds" placeholder="-- Select permissions --" options={permissionOptions} />
      </Form.Item>

      <div className="w-full flex justify-end">
        <Button element="button" type="submit" color="danger" variant="solid">
          Edit
        </Button>
      </div>
    </Form>
  );
};

export default UpdateRoleForm;

"use client";

import { GetProp, Modal, Popover, Table, TablePaginationConfig, TableProps, Tag as AntdTag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { AuthContext } from "@/providers/AuthProvider";
import { Role } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { timestampToDateTime } from "@/utils/formatter";

import RoleActions from "./components/ActionButtons";
import CreateRoleForm from "./components/CreateRoleForm";
import UpdateRoleForm from "./components/UpdateRoleForm";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const RolesModule = () => {
  const authContext = React.use(AuthContext);
  const [modalApi, modalHolder] = Modal.useModal();

  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, refetch } = useQuery(
    "roles",
    async () => {
      if (!authContext?.auth.token) return null;

      const { data } = (
        await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Role[]>>>(
          `/roles?pageNumber=${tableParams.pagination?.current}&size=${tableParams.pagination?.pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${authContext.auth.token}`,
            },
          }
        )
      ).data;

      return data;
    },
    {
      enabled: !!authContext?.auth.token,
    }
  );

  const onAddNew = () => {
    modalApi.info({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Add new role
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <CreateRoleForm refreshData={() => refetch()} />,
    });
  };

  const onEdit = (role: Role) => {
    modalApi.info({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Edit role {role.name}
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <UpdateRoleForm role={role} refreshData={() => refetch()} />,
    });
  };

  const columns: TableProps<Role>["columns"] = React.useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "5%",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "7.5%",
      },
      {
        title: "Permissions",
        dataIndex: "permissions",
        key: "permissions",
        width: "22.5%",
        render: (_, { permissions }) => (
          <div className="flex gap-y-[0.5rem] flex-wrap">
            {permissions.map((permission) => (
              <AntdTag key={permission.value} color="blue">
                {permission.name}
              </AntdTag>
            ))}
          </div>
        ),
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "5%",
        render: (createdAt: string) => timestampToDateTime(createdAt),
      },
      {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: "5%",
        render: (updatedAt: string) => timestampToDateTime(updatedAt),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "5%",
        render: (_, role) => (
          <div className="flex gap-[1rem]">
            <RoleActions role={role} onEdit={() => onEdit(role)} />
          </div>
        ),
      },
    ],
    [data]
  );

  React.useEffect(() => {
    refetch();
  }, [tableParams.pagination?.current]);

  return (
    <div className="w-full h-full">
      <Popover content={<Typography fontSize="sm">Add new one</Typography>}>
        <Button element="button" type="button" size="sm" icon className="mb-[1rem]" onClick={() => onAddNew()}>
          <FaPlus />
        </Button>
      </Popover>

      <Table
        columns={columns}
        dataSource={data?.content}
        size="small"
        rowKey={(record: Role) => record.name}
        bordered
        pagination={{
          current: tableParams.pagination?.current,
          pageSize: tableParams.pagination?.pageSize,
          total: data?.totalElements,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} roles`,
        }}
        onChange={(pagination) => {
          setTableParams({
            pagination,
          });
        }}
      />

      {modalHolder}
    </div>
  );
};

export default RolesModule;

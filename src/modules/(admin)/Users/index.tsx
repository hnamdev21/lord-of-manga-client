"use client";

import { GetProp, Modal, Popover, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import { FaUpRightFromSquare } from "@/components/Icons";
import Typography from "@/components/Typography";
import { DefaultRoleValue } from "@/constants/default-data";
import Path from "@/constants/path";
import { AuthContext } from "@/providers/AuthProvider";
import { User } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { conciseText, timestampToDateTime, toReadable } from "@/utils/formatter";

import UserActions from "./components/ActionButtons";
import CreateEmployeeForm from "./components/CreateEmployeeForm";
import UpdateEmployeeForm from "./components/UpdateEmployeeForm";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const UsersModule = () => {
  const authContext = React.use(AuthContext);
  const [modalApi, modalHolder] = Modal.useModal();

  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, refetch } = useQuery(
    "users",
    async () => {
      if (!authContext?.auth.token) return null;

      const { data } = (
        await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<User[]>>>(
          `/admin/users?pageNumber=${tableParams.pagination?.current || "0"}&size=${tableParams.pagination?.pageSize || "10"}`,
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
          Create new Employee
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <CreateEmployeeForm refreshData={() => refetch()} />,
    });
  };

  const onEdit = (user: User) => {
    modalApi.info({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Edit employee {user.username}
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <UpdateEmployeeForm user={user} refreshData={() => refetch()} />,
    });
  };

  const onBan = async (user: User) => {
    await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/users/${user.id}/ban`, null, {
      headers: {
        Authorization: `Bearer ${authContext?.auth.token}`,
      },
    });

    refetch();
  };

  const columns: TableProps<User>["columns"] = React.useMemo(
    () => [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "8%",
        onCell: (_) => ({
          style: {
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }),
        render: (_, { id, username }) => (
          <React.Fragment>
            {conciseText(username, 30)}
            <Button icon href={Path.USER.PROFILE + "/" + id} color="dark" variant="plain" size="sm" className="inline-block">
              <FaUpRightFromSquare />
            </Button>
          </React.Fragment>
        ),
      },
      {
        title: "Full name",
        dataIndex: "fullName",
        key: "fullName",
        width: "8%",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "8%",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "Gender",
        width: "8%",
        render: (_, { gender }) => toReadable(gender),
      },
      {
        title: "Roles",
        dataIndex: "roles",
        key: "roles",
        width: "8%",
        render: (_, { roles }) => roles.map((role) => <Tag key={role.id}>{role.name}</Tag>),
      },
      {
        title: "Verified",
        dataIndex: "verifiedUser",
        key: "verifiedUser",
        width: "8%",
        render: (_, { verifiedUser }) => (verifiedUser ? <Tag color="green">Verified</Tag> : <Tag color="red">Not Verified</Tag>),
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "8%",
        render: (createdAt: string) => timestampToDateTime(createdAt),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "8%",
        render: (_, user) => (
          <div className="flex gap-[1rem]">
            {user.roles.some((role) => role.value === DefaultRoleValue.ADMIN) ? null : (
              <UserActions user={user} onBan={() => onBan(user)} onViewDetail={() => {}} onEdit={() => onEdit(user)} />
            )}
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
      <Popover content={<Typography fontSize="sm">Create new Employee account</Typography>}>
        <Button element="button" type="button" size="sm" icon className="mb-[1rem]" onClick={() => onAddNew()}>
          <FaPlus />
        </Button>
      </Popover>

      <Typography>Total 0/{tableParams.pagination?.pageSize} selected record(s)</Typography>

      <Table
        columns={columns}
        dataSource={data?.content}
        size="small"
        rowKey={(record: User) => record.id}
        bordered
        pagination={{
          current: tableParams.pagination?.current,
          pageSize: tableParams.pagination?.pageSize,
          total: data?.totalElements,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} record(s)`,
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

export default UsersModule;

"use client";

import { GetProp, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import { FaUpRightFromSquare } from "@/components/Icons";
import Typography from "@/components/Typography";
import { DefaultRoleName } from "@/constants/default-data";
import { GenderMapping } from "@/constants/mapping";
import Path from "@/constants/path";
import { AuthContext } from "@/providers/AuthProvider";
import { User } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { conciseText, timestampToDateTime } from "@/utils/formatter";

import UserActions from "./components/ActionButtons";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const UsersModule = () => {
  const authContext = React.use(AuthContext);

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
            <Button shape="square" href={Path.USER.PROFILE + "/" + id} color="dark" variant="plain" size="sm" className="inline-block">
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
        render: (_, { gender }) => GenderMapping[gender],
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
            {user.roles.some((role) => role.name === DefaultRoleName.ADMIN) ? null : <UserActions onBan={() => onBan(user)} onViewDetail={() => {}} />}
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
    </div>
  );
};

export default UsersModule;

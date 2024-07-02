"use client";

import { GetProp, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaEye, FaUserSlash } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import { AuthContext } from "@/providers/AuthProvider";
import { User } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { timestampToDateTime } from "@/utils/formatter";

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
          `/admin/users?pageNumber=${tableParams.pagination?.current}&size=${tableParams.pagination?.pageSize}`,
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

  const columns: TableProps<User>["columns"] = React.useMemo(
    () => [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "8%",
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
      },
      {
        title: "Roles",
        dataIndex: "roles",
        key: "roles",
        width: "8%",
        render: (_, { roles }) => roles.map((role) => <Tag key={role.id}>{role.name}</Tag>),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "8%",
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
        render: (_) => (
          <div className="flex gap-[1rem]">
            <Button element="button" type="button" color="dark" variant="plain" size="sm" onClick={() => {}} className="flex justify-center items-center">
              <FaEye />
            </Button>
            <Button element="button" type="button" color="danger" size="sm" onClick={() => {}} className="flex justify-center items-center">
              <FaUserSlash />
            </Button>
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
          position: ["bottomCenter"],
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

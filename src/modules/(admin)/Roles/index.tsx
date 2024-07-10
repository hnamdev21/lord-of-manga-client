"use client";

import { GetProp, Table, TablePaginationConfig, TableProps, Tag as AntdTag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaMarker } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import { PermissionNameMapping } from "@/constants/mapping";
import { AuthContext } from "@/providers/AuthProvider";
import { Role } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { timestampToDateTime } from "@/utils/formatter";

import ActionButtons from "./ActionButtons";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const RolesModule = () => {
  const authContext = React.use(AuthContext);

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
              <AntdTag key={permission.id} color="blue">
                {PermissionNameMapping[permission.name]}
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
            <ActionButtons role={role} />
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
        rowKey={(record: Role) => record.id}
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
    </div>
  );
};

export default RolesModule;

"use client";

import { GetProp, Popover, Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { AuthContext } from "@/providers/AuthProvider";
import { Category } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { timestampToDateTime } from "@/utils/formatter";

import CategoryActions from "./components/ActionButtons";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const CategoriesModule = () => {
  const authContext = React.use(AuthContext);

  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, refetch } = useQuery(
    "categories",
    async () => {
      if (!authContext?.auth.token) return null;

      const { data } = (
        await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Category[]>>>(
          `/categories?pageNumber=${tableParams.pagination?.current}&size=${tableParams.pagination?.pageSize}`,
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

  const columns: TableProps<Category>["columns"] = React.useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "8%",
      },
      {
        title: "Total used",
        dataIndex: "totalUsed",
        key: "totalUsed",
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
            <CategoryActions onEdit={() => {}} onDelete={() => {}} />
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
        <Button element="button" type="button" size="sm" icon className="mb-[1rem]">
          <FaPlus />
        </Button>
      </Popover>

      <Typography>Total 0/{tableParams.pagination?.pageSize} selected record(s)</Typography>

      <Table
        columns={columns}
        dataSource={data?.content}
        size="small"
        rowKey={(record: Category) => record.id}
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

export default CategoriesModule;

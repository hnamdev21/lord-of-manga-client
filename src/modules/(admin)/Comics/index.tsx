"use client";

import { GetProp, Table, TablePaginationConfig, TableProps, Tag as AntdTag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import { ComicTypeMapping } from "@/constants/mapping";
import { AuthContext } from "@/providers/AuthProvider";
import { Comic } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { numberToCurrency, timestampToDateTime } from "@/utils/formatter";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const ComicsModule = () => {
  const authContext = React.use(AuthContext);

  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, refetch } = useQuery(
    "comics",
    async () => {
      if (!authContext?.auth.token) return null;

      const { data } = (
        await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>(
          `/comics?pageNumber=${tableParams.pagination?.current}&size=${tableParams.pagination?.pageSize}`,
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

  const columns: TableProps<Comic>["columns"] = React.useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        onCell: (_) => ({
          style: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 0,
          },
        }),
        width: "15%",
      },
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
        width: "10%",
      },
      {
        title: "Categories",
        dataIndex: "categories",
        key: "categories",
        width: "15%",
        render: (_, { categories }) => categories.map((category) => <AntdTag key={category.id}>{category.name}</AntdTag>),
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        width: "15%",
        render: (_, { tags }) => tags.map((tag) => <AntdTag key={tag.id}>{tag.name}</AntdTag>),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "10%",
        render: (_, { type }) => <AntdTag color={type === "FREE" ? "success" : "warning"}>{ComicTypeMapping[type]}</AntdTag>,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: "10%",
        render: (price: number) => numberToCurrency(price),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "7.5%",
        render: (_, { status }) => <AntdTag color="blue">{status}</AntdTag>,
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "10%",
        render: (createdAt: string) => timestampToDateTime(createdAt),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "12.5%",
        render: (_) => (
          <div className="flex gap-[1rem]">
            <Button
              element="button"
              type="button"
              color="transparent"
              variant="plain"
              size="sm"
              onClick={() => {}}
              className="flex justify-center items-center"
            >
              <FaEye />
            </Button>
            <Button
              element="button"
              type="button"
              color="transparent"
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="flex justify-center items-center"
            >
              <FaPen />
            </Button>
            <Button element="button" type="button" color="danger" size="sm" onClick={() => {}} className="flex justify-center items-center">
              <FaTrash />
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
        rowKey={(record: Comic) => record.id}
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

export default ComicsModule;

"use client";

import { GetProp, Table, TablePaginationConfig, TableProps, Tag as AntdTag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaBan, FaCheck, FaEllipsisH, FaEye, FaMarker, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import { ComicStatusMapping, ComicTypeMapping } from "@/constants/mapping";
import { AuthContext } from "@/providers/AuthProvider";
import { Comic, ComicStatus } from "@/types/data";
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
        title: "Created By",
        dataIndex: "creator",
        key: "creator",
        width: "10%",
        render: (_, { creator }) => creator.username,
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
        render: (_, { status }) => {
          let color = "yellow";
          let icon = <FaEllipsisH />;

          switch (status) {
            case ComicStatus.APPROVED:
              color = "green";
              icon = <FaCheck />;
              break;
            case ComicStatus.BANNED:
              color = "red";
              icon = <FaBan />;
              break;
            case ComicStatus.DELETED:
              color = "gray";
              icon = <FaTrash />;
              break;
          }

          return (
            <AntdTag color={color} style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              {icon}
              {ComicStatusMapping[status]}
            </AntdTag>
          );
        },
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "10%",
        render: (createdAt: string) => timestampToDateTime(createdAt),
      },
      {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: "10%",
        render: (updatedAt: string) => timestampToDateTime(updatedAt),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "12.5%",
        render: (_, { status }) => (
          <div className="flex gap-[1rem]">
            <Button element="button" type="button" color="dark" variant="plain" size="sm" onClick={() => {}} className="flex justify-center items-center">
              <FaEye />
            </Button>
            <Button element="button" type="button" color="dark" variant="outline" size="sm" onClick={() => {}} className="flex justify-center items-center">
              <FaMarker />
            </Button>
            <Button element="button" type="button" color="danger" variant="outline" size="sm" onClick={() => {}} className="flex justify-center items-center">
              <FaBan />
            </Button>
            {status === ComicStatus.PENDING && (
              <Button element="button" type="button" color="success" size="sm" onClick={() => {}} className="flex justify-center items-center">
                <FaCheck />
              </Button>
            )}
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
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} comics`,
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

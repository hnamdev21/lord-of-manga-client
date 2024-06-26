"use client";

import { message, notification, Table, TableProps, Tag as TagComponent } from "antd";
import React from "react";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { TypeMapping } from "@/constants/mapping";
import Path from "@/constants/path";
import { AuthContext } from "@/providers/AuthProvider";
import { Category, Comic, Tag } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { numberToCurrency, timestampToDateTime } from "@/utils/formatter";

const ComicManagementModule = () => {
  const authContext = React.use(AuthContext);
  const [notificationApi, contextHolder] = notification.useNotification();

  const { data, refetch } = useQuery(
    "my-comics",
    async () => {
      if (!authContext?.auth.token) return [];

      const { data } = (
        await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>("/comics/mine?all=true", {
          headers: {
            Authorization: `Bearer ${authContext.auth.token}`,
          },
        })
      ).data;
      return data.content;
    },
    {
      enabled: !!authContext?.auth.token,
    }
  );

  const onRestore = async (id: string) => {
    const response = (
      await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/comics/${id}/restore`, null, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (response.code === "OK") {
      refetch();
      message.success("Restored comic from recycle bin");
    }
  };

  const onDelete = async (id: string) => {
    const response = (
      await AXIOS_INSTANCE.delete<BaseResponse<boolean>>(`/comics/${id}`, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (response.code === "OK") {
      refetch();
      notificationApi.open({
        message: "",
        placement: "bottomLeft",
        closeIcon: null,
        description: (
          <React.Fragment>
            Comic has been moved to recycle bin{" "}
            <Button
              onClick={() => {
                onRestore(id);
              }}
              element="button"
              variant="outline"
              type="button"
              size="xs"
            >
              Restore
            </Button>
          </React.Fragment>
        ),
        duration: 5,
      });
    }
  };

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
        render: (categories: Category[]) => categories.map((category) => <TagComponent key={category.id}>{category.name}</TagComponent>),
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        width: "15%",
        render: (tags: Tag[]) => tags.map((tag) => <TagComponent key={tag.id}>{tag.name}</TagComponent>),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "10%",
        render: (type: string) => TypeMapping[type] || type,
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
        render: (_, { id, slug }) => (
          <div className="flex gap-[1rem]">
            <Button href="#" variant="plain" size="sm">
              Edit
            </Button>
            <Button href={Path.USER.COMIC_MANAGEMENT + "/" + slug} variant="outline" size="sm">
              Detail
            </Button>
            <Button element="button" type="button" color="danger" size="sm" onClick={() => onDelete(id)}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      {contextHolder}
      <Container noGrid className="mb-[2rem]">
        <Typography align="center" tag="h1" fontSize="xl" fontWeight="bold" className="mb-[1rem]">
          Comic Management
        </Typography>

        <Table columns={columns} dataSource={data} size="small" pagination={false} rowKey={(record: Comic) => record.id} bordered />
      </Container>
    </React.Fragment>
  );
};

export default ComicManagementModule;

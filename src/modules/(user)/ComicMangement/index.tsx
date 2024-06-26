"use client";

import { message, Modal, notification, Table, TableProps, Tag as AntdTag } from "antd";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { ComicTypeMapping } from "@/constants/mapping";
import { AuthContext } from "@/providers/AuthProvider";
import { Comic } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { numberToCurrency, timestampToDateTime } from "@/utils/formatter";

import ComicDetail from "./ComicDetail";
import FormUpdate from "./FormUpdate";

const ComicManagementModule = () => {
  const authContext = React.use(AuthContext);
  const [notificationApi, notificationHolder] = notification.useNotification();
  const [modalApi, modalHolder] = Modal.useModal();

  const { data, refetch } = useQuery(
    "my-comics",
    async () => {
      if (!authContext?.auth.token) return null;

      const { data } = (
        await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>("/comics/mine?all=true", {
          headers: {
            Authorization: `Bearer ${authContext.auth.token}`,
          },
        })
      ).data;

      return data;
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

  const onEdit = React.useCallback(
    (id: string) => {
      const comic = data?.content.find((comic) => comic.id === id);

      if (!comic) {
        message.error("Something went wrong. Please try again later");
        return;
      }

      modalApi.confirm({
        title: (
          <Typography tag="h3" align="center" fontSize="lg">
            Edit Comic
          </Typography>
        ),
        width: "30%",
        content: <FormUpdate comic={comic} />,
        icon: null,
        centered: true,
        footer: null,
        maskClosable: true,
        closable: true,
        closeIcon: <FaTimes />,
      });
    },
    [data]
  );

  const onDetail = React.useCallback(
    (id: string) => {
      const comic = data?.content.find((comic) => comic.id === id);

      if (!comic) {
        message.error("Something went wrong, please try again later");
        return;
      }

      modalApi.info({
        title: (
          <Typography tag="h1" fontSize="xl" fontWeight="bold" align="center">
            {comic.title}
          </Typography>
        ),
        width: 1640,
        content: <ComicDetail comic={comic} />,
        icon: null,
        centered: true,
        footer: null,
        maskClosable: true,
        closable: true,
        closeIcon: <FaTimes />,
      });
    },
    [data]
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
        render: (_, { type }) => <AntdTag color={type === "FREE" ? "green" : "yellow"}>{ComicTypeMapping[type]}</AntdTag>,
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
        render: (_, { id }) => (
          <div className="flex gap-[1rem]">
            <Button element="button" type="button" variant="plain" size="sm" onClick={() => onEdit(id)}>
              Edit
            </Button>
            <Button element="button" type="button" variant="outline" size="sm" onClick={() => onDetail(id)}>
              Detail
            </Button>
            <Button element="button" type="button" color="danger" size="sm" onClick={() => onDelete(id)}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [data]
  );

  return (
    <React.Fragment>
      {notificationHolder}
      {modalHolder}

      <Container noGrid className="mb-[2rem]">
        <Typography align="center" tag="h1" fontSize="xl" fontWeight="bold" className="mb-[1rem]">
          Comic Management
        </Typography>

        <Table columns={columns} dataSource={data?.content} size="small" pagination={false} rowKey={(record: Comic) => record.id} bordered />
      </Container>
    </React.Fragment>
  );
};

export default ComicManagementModule;

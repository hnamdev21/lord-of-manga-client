"use client";

import { message, Modal, Table, TableProps, Tag as AntdTag } from "antd";
import React from "react";
import { FaEye, FaTimes, FaTrashRestore } from "react-icons/fa";
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

import ComicDetail from "../ComicMangement/ComicDetail";

const RecycleBinModule = () => {
  const authContext = React.use(AuthContext);
  const [modalApi, modalHolder] = Modal.useModal();

  const { data, refetch } = useQuery(
    "recycle-bin",
    async () => {
      if (!authContext?.auth.token) return null;

      const { data } = (
        await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>("/comics/mine?all=true&status=DELETED", {
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
        title: "Deleted by",
        dataIndex: "deletedr",
        key: "deletedr",
        width: "10%",
        render: (_, { deleter }) => (deleter?.roles.some((role) => role.name === "ADMIN") ? "Admin" : "Your self"),
      },
      {
        title: "Reason",
        dataIndex: "deletedReason",
        key: "deletedReason",
        width: "7.5%",
      },
      {
        title: "Deleted at",
        dataIndex: "deletedAt",
        key: "deletedAt",
        width: "10%",
        render: ({ deletedAt }) => timestampToDateTime(deletedAt),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "12.5%",
        render: (_, { id }) => (
          <div className="flex gap-[1rem]">
            <Button element="button" type="button" variant="plain" size="sm" onClick={() => onDetail(id)} className="flex justify-center items-center">
              <FaEye />
            </Button>
            <Button element="button" type="button" color="danger" size="sm" onClick={() => onRestore(id)} className="flex justify-center items-center">
              <FaTrashRestore />
            </Button>
          </div>
        ),
      },
    ],
    [data]
  );

  return (
    <React.Fragment>
      {modalHolder}

      <Container noGrid className="mb-[2rem]">
        <Typography align="center" tag="h1" fontSize="xl" fontWeight="bold" className="mb-[1rem]">
          Recycle Bin
        </Typography>

        <Table columns={columns} dataSource={data?.content} size="small" pagination={false} rowKey={(record: Comic) => record.id} bordered />
      </Container>
    </React.Fragment>
  );
};

export default RecycleBinModule;

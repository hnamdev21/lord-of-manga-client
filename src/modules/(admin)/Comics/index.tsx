"use client";

import { GetProp, message, Modal, Table, TablePaginationConfig, TableProps, Tag as AntdTag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaBan, FaCheck, FaEllipsisH, FaTimes, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";

import Button from "@/components/Button";
import ComicDetail from "@/components/ComicDetailModal";
import DeleteComicForm from "@/components/FormDeleteComicModal";
import { FaUpRightFromSquare } from "@/components/Icons";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import Path from "@/constants/path";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { AdminAPI } from "@/services/apis/admin";
import { Comic, ComicStatus, ComicType } from "@/types/data";
import { conciseText, numberToCurrency, timestampToDateTime, toReadable } from "@/utils/formatter";

import ComicActions from "./components/ActionButtons";
import BanComicForm from "./components/BanComicForm";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const ComicsModule = () => {
  const authContext = React.use(AuthContext);
  const [modalApi, modalHolder] = Modal.useModal();

  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  if (!authContext) return null;

  const { data: comics, refetch } = useQuery(
    ["admin", "comics", tableParams.pagination?.current, tableParams.pagination?.pageSize],
    async () => {
      const response = await AdminAPI.getAllComics({
        token: authContext.auth.token,
        params: {
          pageNumber: tableParams.pagination?.current,
          size: tableParams.pagination?.pageSize,
        },
      });

      return response.data;
    },
    {
      enabled: !!authContext?.auth.token,
    }
  );

  const onViewDetail = React.useCallback(
    (comic: Comic) => {
      modalApi.info({
        title: (
          <Typography tag="h1" fontSize="xl" fontWeight="bold" align="center">
            {comic.title}
          </Typography>
        ),
        width: "80%",
        content: <ComicDetail comic={comic} />,
        icon: null,
        centered: true,
        footer: null,
        maskClosable: true,
        closable: true,
        closeIcon: <FaTimes />,
      });
    },
    [comics]
  );

  const onBan = React.useCallback((comic: Comic) => {
    modalApi.warning({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Ban comic:{" "}
          <Typography tag="span" fontSize="md" fontWeight="bold">
            {comic.title}
          </Typography>
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <BanComicForm refreshData={() => refetch()} comic={comic} />,
    });
  }, []);

  const onApprove = React.useCallback(async (comic: Comic) => {
    const response = await AdminAPI.approveComic({ id: comic.id, token: authContext.auth.token });

    if (response.code === StatusCode.OK) {
      message.success(Notification.approveSuccess(comic.title));
      refetch();
    }
  }, []);

  const onDelete = React.useCallback((comic: Comic) => {
    modalApi.warning({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Delete comic:{" "}
          <Typography tag="span" fontSize="md" fontWeight="bold">
            {comic.title}
          </Typography>
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <DeleteComicForm refreshData={() => refetch()} comic={comic} />,
    });
  }, []);

  const columns: TableProps<Comic>["columns"] = React.useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
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
        width: "15%",
        render: (_, { title, slug }) => (
          <React.Fragment>
            {conciseText(title, 30)}
            <Button icon href={Path.USER.COMICS + "/" + slug} color="dark" variant="plain" size="sm" className="inline-block">
              <FaUpRightFromSquare />
            </Button>
          </React.Fragment>
        ),
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
        render: (_, { type }) => <AntdTag color={type === ComicType.FREE ? "success" : "warning"}>{toReadable(type)}</AntdTag>,
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
        width: "10%",
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
              {toReadable(status)}
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
        width: "15%",
        render: (_, comic) => (
          <div className="flex gap-[1rem]">
            <ComicActions
              slug={comic.slug}
              status={comic.status}
              onViewDetail={() => onViewDetail(comic)}
              onBan={() => onBan(comic)}
              onApprove={() => onApprove(comic)}
              onDelete={() => onDelete(comic)}
            />
          </div>
        ),
      },
    ],
    [comics]
  );

  React.useEffect(() => {
    refetch();
  }, [tableParams.pagination]);

  return (
    <div className="w-full h-full flex flex-col gap-[3.5rem]">
      <div className="w-full h-[4rem] bg-black" />

      <div className="w-full flex-1 relative">
        <div className="absolute z-10 -translate-y-[100%] w-full h-[2.5rem] flex">
          <div className="w-[15%] h-full" />
          <div className="w-[10%] h-full" />
          <div className="w-[10%] h-full" />
          <div className="w-[10%] h-full" />
          <div className="w-[10%] h-full" />
          <div className="w-[10%] bg-[var(--color-gray-2)] h-full rounded-tl-2xl rounded-tr-2xl border border-solid border-gray-200 py-[.25rem] flex items-center justify-center gap-[.5rem]">
            <Button element="button" icon type="button" color="warning" variant="outline" size="xs" onClick={() => {}}>
              <FaEllipsisH />
            </Button>
            <Button element="button" icon type="button" color="success" variant="outline" size="xs" onClick={() => {}}>
              <FaCheck />
            </Button>
            <Button element="button" icon type="button" color="danger" variant="outline" size="xs" onClick={() => {}}>
              <FaBan />
            </Button>
            <Button element="button" icon type="button" color="gray" variant="outline" size="xs" onClick={() => {}}>
              <FaTrash />
            </Button>
          </div>
          <div className="w-[10%] h-full" />
          <div className="w-[10%] h-full" />
          <div className="w-[15%] h-full" />
        </div>

        <Table
          columns={columns}
          dataSource={comics?.content}
          size="small"
          rowKey={(record: Comic) => record.id}
          bordered
          pagination={{
            current: tableParams.pagination?.current,
            pageSize: tableParams.pagination?.pageSize,
            total: comics?.totalElements,
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
    </div>
  );
};

export default ComicsModule;

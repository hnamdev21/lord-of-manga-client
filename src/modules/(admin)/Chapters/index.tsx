"use client";

import { GetProp, message, Modal, Table, TablePaginationConfig, TableProps, Tag as AntdTag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaBan, FaCheck, FaEllipsisH, FaTimes, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";

import Button from "@/components/Button";
import ChapterDetail from "@/components/ChapterDetailModal";
import DeleteChapterForm from "@/components/FormDeleteChapterModal";
import { FaUpRightFromSquare } from "@/components/Icons";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import Path from "@/constants/path";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { AdminAPI } from "@/services/apis/admin";
import AXIOS_INSTANCE from "@/services/instance";
import { Chapter, ChapterStatus, ChapterType, Comic } from "@/types/data";
import { BaseResponse } from "@/types/response";
import { conciseText, numberToCurrency, timestampToDateTime, toReadable } from "@/utils/formatter";

import ChapterActions from "./components/ActionButtons";
import BanChapterForm from "./components/BanChapterForm";

type Props = {
  comicSlug: string;
};

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const ChaptersModule = ({ comicSlug }: Props) => {
  const authContext = React.use(AuthContext);
  const [modalApi, modalHolder] = Modal.useModal();

  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data: comic } = useQuery(["admin", "comic", comicSlug], async () => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<Comic>>(`/comics/slug/${comicSlug}`)).data; // TODO: MOVE URL TO ADMIN

    return data;
  });

  const { data: chapters, refetch } = useQuery(
    ["admin", "chapters", comicSlug, tableParams.pagination?.current, tableParams.pagination?.pageSize],
    async () => {
      const response = await AdminAPI.getAllChaptersByComicSlug({
        slug: comicSlug,
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
    (chapter: Chapter) => {
      modalApi.info({
        title: (
          <Typography tag="h1" fontSize="xl" fontWeight="bold" align="center">
            {chapter.title}
          </Typography>
        ),
        width: "50%",
        content: comic ? <ChapterDetail comic={comic} chapter={chapter} /> : null,
        icon: null,
        centered: true,
        footer: null,
        maskClosable: true,
        closable: true,
        closeIcon: <FaTimes />,
      });
    },
    [comic, chapters]
  );

  const onBan = React.useCallback((chapter: Chapter) => {
    modalApi.warning({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Ban chapter:{" "}
          <Typography tag="span" fontSize="md" fontWeight="bold">
            {chapter.title}
          </Typography>
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <BanChapterForm chapter={chapter} refreshData={refetch} />,
    });
  }, []);

  const onApprove = React.useCallback(async (chapter: Chapter) => {
    const response = await AdminAPI.approveChapter({ id: chapter.id, token: authContext.auth.token });

    if (response.code === StatusCode.OK) {
      message.success(Notification.approveSuccess(chapter.title));
      refetch();
    }
  }, []);

  const onDelete = React.useCallback((chapter: Chapter) => {
    modalApi.warning({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Delete chapter:{" "}
          <Typography tag="span" fontSize="md" fontWeight="bold">
            {chapter.title}
          </Typography>
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <DeleteChapterForm chapter={chapter} refreshData={refetch} />,
    });
  }, []);

  const columns: TableProps<Chapter>["columns"] = React.useMemo(
    () => [
      {
        title: "NO.",
        dataIndex: "ordinal",
        key: "ordinal",
        width: "5%",
      },
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
            <Button icon href={Path.USER.COMICS + "/" + comicSlug + "/" + slug} color="dark" variant="plain" size="sm" className="inline-block">
              <FaUpRightFromSquare />
            </Button>
          </React.Fragment>
        ),
      },
      {
        title: "Total pages",
        dataIndex: "totalPages",
        key: "totalPages",
        width: "5%",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "10%",
        render: (_, { type }) => <AntdTag color={type === ChapterType.FREE ? "success" : "warning"}>{toReadable(type)}</AntdTag>,
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
            case ChapterStatus.APPROVED:
              color = "green";
              icon = <FaCheck />;
              break;
            case ChapterStatus.BANNED:
              color = "red";
              icon = <FaBan />;
              break;
            case ChapterStatus.DELETED:
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
        title: "Total comments",
        dataIndex: "totalComments",
        key: "totalComments",
        width: "10%",
        render: (_, { comments }) => comments.length,
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
        render: (_, chapter) => (
          <div className="flex gap-[1rem]">
            <ChapterActions
              slug={chapter.slug}
              status={chapter.status}
              onViewDetail={() => onViewDetail(chapter)}
              onBan={() => onBan(chapter)}
              onApprove={() => onApprove(chapter)}
              onDelete={() => onDelete(chapter)}
            />
          </div>
        ),
      },
    ],
    [chapters]
  );

  React.useEffect(() => {
    refetch();
  }, [tableParams.pagination]);

  return (
    <div className="w-full h-full flex flex-col gap-[3.5rem]">
      <div className="w-full h-[4rem] bg-black" />

      <div className="w-full flex-1 relative">
        <div className="absolute z-10 -translate-y-[100%] w-full h-[2.5rem] flex">
          <div className="w-[5%] h-full" />
          <div className="w-[15%] h-full" />
          <div className="w-[5%] h-full" />
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
          <div className="w-[10%] h-full" />
          <div className="w-[15%] h-full" />
        </div>

        <Table
          columns={columns}
          dataSource={chapters?.content}
          size="small"
          rowKey={(record: Chapter) => record.id}
          bordered
          pagination={{
            current: tableParams.pagination?.current,
            pageSize: tableParams.pagination?.pageSize,
            total: chapters?.totalElements,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} chapters`,
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

export default ChaptersModule;

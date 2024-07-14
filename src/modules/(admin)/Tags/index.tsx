"use client";

import { GetProp, message, Modal, Popover, Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { Tag } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";
import { timestampToDateTime } from "@/utils/formatter";

import TagActions from "./components/ActionButtons";
import CreateTagForm from "./components/CreateTagForm";
import UpdateTagForm from "./components/UpdateTagForm";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const TagsModule = () => {
  const authContext = React.use(AuthContext);
  const [modalApi, modalHolder] = Modal.useModal();

  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, refetch } = useQuery(
    "tags",
    async () => {
      if (!authContext?.auth.token) return null;

      const { data } = (
        await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Tag[]>>>(
          `/tags?pageNumber=${tableParams.pagination?.current}&size=${tableParams.pagination?.pageSize}`,
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

  const onAddNew = () => {
    modalApi.info({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Add new tag
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <CreateTagForm refreshData={() => refetch()} />,
    });
  };

  const onEdit = (record: Tag) => {
    modalApi.info({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Edit category {record.name}
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <UpdateTagForm tag={record} refreshData={() => refetch()} />,
    });
  };

  const deleteTag = async (record: Tag) => {
    const response = (
      await AXIOS_INSTANCE.delete<BaseResponse<boolean>>(`/categories/${record.id}`, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (response.code === StatusCode.OK) {
      refetch();
      message.success(Notification.removeSuccess("Tag"));
      Modal.destroyAll();
    }
  };

  const onDelete = (record: Tag) => {
    modalApi.confirm({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Confirm
        </Typography>
      ),
      icon: null,
      centered: true,
      onOk: () => deleteTag(record),
      onCancel: () => Modal.destroyAll(),
      okText: "Yes",
      cancelText: "No",
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: (
        <Typography align="center">
          Are you sure to delete tag{" "}
          <Typography tag="span" fontWeight="bold">
            {record.name}
          </Typography>
        </Typography>
      ),
    });
  };

  const columns: TableProps<Tag>["columns"] = React.useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
      },
      {
        title: "Total used",
        dataIndex: "totalUsed",
        key: "totalUsed",
        width: "20%",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "20%",
        render: (createdAt: string) => timestampToDateTime(createdAt),
      },
      {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: "20%",
        render: (updatedAt: string) => timestampToDateTime(updatedAt),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "20%",
        render: (_, tag) => (
          <div className="flex gap-[1rem]">
            <TagActions onEdit={() => onEdit(tag)} onDelete={() => onDelete(tag)} />
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
        <Button element="button" type="button" size="sm" icon className="mb-[1rem]" onClick={() => onAddNew()}>
          <FaPlus />
        </Button>
      </Popover>

      <Typography>Total 0/{tableParams.pagination?.pageSize} selected record(s)</Typography>

      <Table
        columns={columns}
        dataSource={data?.content}
        size="small"
        rowKey={(record: Tag) => record.id}
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

      {modalHolder}
    </div>
  );
};

export default TagsModule;

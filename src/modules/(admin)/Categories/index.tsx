"use client";

import { GetProp, message, Modal, Popover, Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { CategoryAPI } from "@/services/apis/category";
import { Category } from "@/types/data";
import { timestampToDateTime } from "@/utils/formatter";

import CategoryActions from "./components/ActionButtons";
import CreateCategoryForm from "./components/CreateCategoryForm";
import UpdateCategoryForm from "./components/UpdateCategoryForm";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const CategoriesModule = () => {
  const authContext = React.use(AuthContext);
  const [modalApi, modalHolder] = Modal.useModal();

  if (!authContext) return null;

  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, refetch } = useQuery(
    "categories",
    async () => {
      const response = await CategoryAPI.getAllCategories({
        pageNumber: tableParams.pagination?.current,
        size: tableParams.pagination?.pageSize,
      });

      return response.data;
    },
    {
      enabled: !!authContext?.auth.token,
    }
  );

  const onAddNew = () => {
    modalApi.info({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Add new category
        </Typography>
      ),
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: <CreateCategoryForm refreshData={() => refetch()} />,
    });
  };

  const onEdit = (record: Category) => {
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
      content: <UpdateCategoryForm category={record} refreshData={() => refetch()} />,
    });
  };

  const deleteCategory = async (record: Category) => {
    const response = await CategoryAPI.deleteCategory({
      id: record.id,
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.OK) {
      refetch();
      Modal.destroyAll();
      message.success(Notification.removeSuccess("Category"));
    }
  };

  const onDelete = (record: Category) => {
    modalApi.confirm({
      title: (
        <Typography tag="h1" fontSize="md" align="center">
          Confirm
        </Typography>
      ),
      icon: null,
      centered: true,
      onOk: () => deleteCategory(record),
      onCancel: () => Modal.destroyAll(),
      okText: "Yes",
      cancelText: "No",
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
      content: (
        <Typography align="center">
          Are you sure to delete category{" "}
          <Typography tag="span" fontWeight="bold">
            {record.name}
          </Typography>
        </Typography>
      ),
    });
  };

  const columns: TableProps<Category>["columns"] = React.useMemo(
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
        render: (_, category) => (
          <div className="flex gap-[1rem]">
            <CategoryActions onEdit={() => onEdit(category)} onDelete={() => onDelete(category)} />
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

      {modalHolder}
    </div>
  );
};

export default CategoriesModule;

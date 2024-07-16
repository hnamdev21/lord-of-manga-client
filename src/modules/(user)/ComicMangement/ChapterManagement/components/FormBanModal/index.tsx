import { Form, FormProps, Input, message } from "antd";
import React from "react";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { AdminAPI } from "@/services/apis/admin";
import { Chapter } from "@/types/data";
import { FormBanChapter } from "@/types/form";

type Props = {
  chapter: Chapter;
  refreshData: () => void;
};

const BanComicForm = ({ chapter, refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  if (!authContext) return null;

  const onFinish: FormProps<FormBanChapter>["onFinish"] = async (values: FormBanChapter) => {
    const response = await AdminAPI.banChapter({
      id: chapter.id,
      formData: values,
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.OK) {
      refreshData();
      message.success(Notification.banSuccess(chapter.title));
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item<FormBanChapter> name="bannedReason">
        <Input placeholder="Banned reason" />
      </Form.Item>

      <div className="w-full flex justify-end">
        <Button element="button" type="submit" color="danger" variant="solid">
          Ban
        </Button>
      </div>
    </Form>
  );
};

export default BanComicForm;

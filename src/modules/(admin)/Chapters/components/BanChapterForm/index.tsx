import { Form, FormProps, Input, message, Modal } from "antd";
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

const BanChapterForm = ({ chapter, refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  const onFinish: FormProps<FormBanChapter>["onFinish"] = async (values: FormBanChapter) => {
    const response = await AdminAPI.banChapter({
      id: chapter.id,
      formData: values,
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.OK) {
      refreshData();
      Modal.destroyAll();
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

export default BanChapterForm;

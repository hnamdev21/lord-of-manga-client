import { Form, Input, message, Modal } from "antd";
import React from "react";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import { AuthContext } from "@/providers/AuthProvider";
import AXIOS_INSTANCE from "@/services/instance";
import { Chapter } from "@/types/data";
import { FormBanChapter } from "@/types/form";
import { BaseResponse } from "@/types/response";

type Props = {
  chapter: Chapter;
  refreshData: () => void;
};

const BanChapterForm = ({ chapter, refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  const onFinish = async (values: FormBanChapter) => {
    const { data } = (
      await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/chapters/${chapter.id}/ban`, values, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (data) {
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

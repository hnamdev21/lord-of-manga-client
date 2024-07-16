import { Form, Input, message, Modal } from "antd";
import React from "react";

import Button from "@/components/Button";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { ComicAPI } from "@/services/apis/comic";
import { Comic } from "@/types/data";
import { FormBanComic } from "@/types/form";

type Props = {
  comic: Comic;
  refreshData: () => void;
};

const BanComicForm = ({ comic, refreshData }: Props) => {
  const authContext = React.use(AuthContext);

  if (!authContext) return null;

  const onFinish = async (values: FormBanComic) => {
    const response = await ComicAPI.banComic({
      id: comic.id,
      formData: values,
      token: authContext.auth.token,
    });

    if (response.code === StatusCode.OK) {
      refreshData();
      Modal.destroyAll();
      message.success(Notification.banSuccess(comic.title));
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item<FormBanComic> name="bannedReason">
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

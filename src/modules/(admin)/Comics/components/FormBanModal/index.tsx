import { Form, Input, message } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import NOTIFICATION from "@/constants/notification";
import { AuthContext } from "@/providers/AuthProvider";
import { Comic } from "@/types/data";
import { FormBanComic } from "@/types/form";
import { BaseResponse } from "@/types/response";

type FormBanModalProps = {
  comic: Comic;
  refreshData: () => void;
};

const FormBanModal = ({ comic, refreshData }: FormBanModalProps) => {
  const authContext = React.use(AuthContext);

  const onFinish = async (values: FormBanComic) => {
    const { data } = (
      await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/comics/${comic.id}/ban`, values, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (data) {
      refreshData();
      message.success(NOTIFICATION.SUCCESS_BAN(comic.title));
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

export default FormBanModal;

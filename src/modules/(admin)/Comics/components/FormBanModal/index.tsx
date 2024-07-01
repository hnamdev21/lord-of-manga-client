import { Form, Input, message, notification } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { AuthContext } from "@/providers/AuthProvider";
import { Comic } from "@/types/data";
import { FormBanComic } from "@/types/form";
import { BaseResponse } from "@/types/response";

type FormBanModalProps = {
  comic: Comic;
};

const FormBanModal = ({ comic }: FormBanModalProps) => {
  const authContext = React.use(AuthContext);
  const [notificationApi, contextHolder] = notification.useNotification();

  const onRestore = async () => {
    const { data } = (
      await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/comics/${comic.id}/restore`, null, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (data) {
      message.success("Restore comic successfully");
    }
  };

  const onFinish = async (values: FormBanComic) => {
    const { data } = (
      await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/comics/${comic.id}/ban`, values, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (data) {
      notificationApi.open({
        message: null,
        placement: "bottomLeft",
        closeIcon: null,
        icon: null,
        description: (
          <React.Fragment>
            <Typography className="flex items-center gap-[.5rem]">
              Comic{" "}
              <Typography tag="span" fontWeight="bold">
                {comic.title}
              </Typography>{" "}
              has been banned
              <Button element="button" type="button" onClick={() => onRestore()} color="dark" variant="outline" size="xs">
                Restore
              </Button>
            </Typography>
          </React.Fragment>
        ),
      });
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

      {contextHolder}
    </Form>
  );
};

export default FormBanModal;

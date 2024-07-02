import { Form, Input, message, notification } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import NOTIFICATION from "@/constants/notification";
import { AuthContext } from "@/providers/AuthProvider";
import { Comic } from "@/types/data";
import { FormDeleteComic } from "@/types/form";
import { BaseResponse } from "@/types/response";

type FormDeleteModalProps = {
  comic: Comic;
  refreshData: () => void;
};

const FormDeleteModal = ({ comic, refreshData }: FormDeleteModalProps) => {
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
      refreshData();
      message.success(NOTIFICATION.SUCCESS_RESTORED(comic.title));
    }
  };

  const onFinish = async (values: FormDeleteComic) => {
    const { data } = (
      await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/comics/${comic.id}/delete`, values, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (data) {
      refreshData();
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
              has been deleted
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
      <Form.Item<FormDeleteComic> name="deletedReason">
        <Input placeholder="Deleted reason" />
      </Form.Item>

      <div className="w-full flex justify-end">
        <Button element="button" type="submit" color="danger" variant="solid">
          Delete
        </Button>
      </div>

      {contextHolder}
    </Form>
  );
};

export default FormDeleteModal;

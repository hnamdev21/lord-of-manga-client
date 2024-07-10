import { Form, Input, message, notification } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import { AuthContext } from "@/providers/AuthProvider";
import { Chapter } from "@/types/data";
import { FormDeleteChapter } from "@/types/form";
import { BaseResponse } from "@/types/response";

type FormDeleteChapterModalProps = {
  chapter: Chapter;
  refreshData: () => void;
};

const FormDeleteChapterModal = ({ chapter, refreshData }: FormDeleteChapterModalProps) => {
  const authContext = React.use(AuthContext);
  const [notificationApi, contextHolder] = notification.useNotification();

  const onRestore = async () => {
    const { data } = (
      await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/chapters/${chapter.id}/restore`, null, {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    if (data) {
      refreshData();
      message.success(Notification.SUCCESS_RESTORED(chapter.title));
    }
  };

  const onFinish = async (values: FormDeleteChapter) => {
    const { data } = (
      await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/chapters/${chapter.id}/delete`, values, {
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
              Chapter{" "}
              <Typography tag="span" fontWeight="bold">
                {chapter.title}
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
      <Form.Item<FormDeleteChapter> name="deletedReason">
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

export default FormDeleteChapterModal;

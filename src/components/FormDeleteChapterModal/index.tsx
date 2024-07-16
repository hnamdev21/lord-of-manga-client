import { Form, Input, message, Modal, notification } from "antd";
import React from "react";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { AdminAPI } from "@/services/apis/admin";
import { Chapter } from "@/types/data";
import { FormDeleteChapter } from "@/types/form";

type Props = {
  chapter: Chapter;
  refreshData: () => void;
};

const DeleteChapterForm = ({ chapter, refreshData }: Props) => {
  const authContext = React.use(AuthContext);
  const [notificationApi, modalHolder] = notification.useNotification();

  if (!authContext) return null;

  const onRestore = async () => {
    const response = await AdminAPI.restoreChapter({ id: chapter.id, token: authContext.auth.token });

    if (response.code === StatusCode.OK) {
      refreshData();
      Modal.destroyAll();
      message.success(Notification.restoreSuccess(chapter.title));
    }
  };

  const onFinish = async (values: FormDeleteChapter) => {
    const response = await AdminAPI.deleteChapter({ id: chapter.id, formData: values, token: authContext.auth.token });

    if (response.code === StatusCode.OK) {
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

      {modalHolder}
    </Form>
  );
};

export default DeleteChapterForm;

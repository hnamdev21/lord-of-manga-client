import { Form, Input, message, notification } from "antd";
import React from "react";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { ComicAPI } from "@/services/apis/comic";
import { Comic } from "@/types/data";
import { FormDeleteComic } from "@/types/form";

type Props = {
  comic: Comic;
  refreshData: () => void;
};

const DeleteComicForm = ({ comic, refreshData }: Props) => {
  const authContext = React.use(AuthContext);
  const [notificationApi, modalHolder] = notification.useNotification();

  if (!authContext) return null;

  const onRestore = async () => {
    const response = await ComicAPI.restoreComic({ id: comic.id, token: authContext.auth.token });

    if (response.code === StatusCode.OK) {
      refreshData();
      message.success(Notification.restoreSuccess(comic.title));
    }
  };

  const onFinish = async (values: FormDeleteComic) => {
    const response = await ComicAPI.deleteComic({ id: comic.id, formData: values, token: authContext.auth.token });

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

      {modalHolder}
    </Form>
  );
};

export default DeleteComicForm;

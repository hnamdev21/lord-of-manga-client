import { Form, FormProps, Input, message, Modal } from "antd";
import cn from "classnames";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import { User } from "@/types/data";
import { FormVerifyEmail } from "@/types/form";
import { BaseResponse } from "@/types/response";

import styles from "./styles.module.scss";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  isVerified: boolean;
  username: string;
  token: string;
};

const EmailInput = ({ value, onChange, isVerified, username, token }: Props) => {
  const authContext = React.use(AuthContext);
  const [formVerifyEmail] = Form.useForm<FormVerifyEmail>();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const headerRequest = React.useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );
  const baseBody = React.useMemo(
    () => ({
      username,
      email: value,
    }),
    [username, value]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onFinish: FormProps<FormVerifyEmail>["onFinish"] = async (values: FormVerifyEmail) => {
    const response = (
      await AXIOS_INSTANCE.put<BaseResponse<boolean>>(
        "/users/mine/verify-mail",
        {
          ...baseBody,
          code: values.code,
        },
        headerRequest
      )
    ).data;

    if (response.code === StatusCode.OK) {
      setIsModalOpen(false);
      authContext?.refreshUser();
      message.success(Notification.successVerified("Email"));
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onVerifyEmail = async () => {
    AXIOS_INSTANCE.post<BaseResponse<User>>("/mail/verification-email", baseBody);

    setIsModalOpen(true);
  };

  return (
    <React.Fragment>
      <div className="w-full flex gap-[2rem]">
        <Input
          className={cn("w-[70%]", {
            [styles.success]: isVerified,
          })}
          disabled={isVerified}
          onChange={onChangeInput}
          value={value}
        />

        <div className="w-[30%] flex items-end">
          <Button
            element="button"
            type="button"
            className="block flex-1"
            color={isVerified ? "success" : "primary"}
            disabled={isVerified}
            onClick={onVerifyEmail}
          >
            {isVerified ? "Verified" : "Verify"}
          </Button>
        </div>
      </div>

      <Modal
        title={
          <Typography tag="h2" fontSize="lg" align="center">
            Verify Email
          </Typography>
        }
        centered
        open={isModalOpen}
        onOk={handleClose}
        onCancel={handleClose}
        onClose={handleClose}
        footer={() => null}
      >
        <Form layout="vertical" form={formVerifyEmail} onFinish={onFinish} className="col-start-6 col-span-2">
          <Form.Item<FormVerifyEmail>
            label={
              <Typography tag="span" fontSize="sm">
                Code
              </Typography>
            }
            style={{ width: "75%", padding: "0 4rem", margin: "auto", marginTop: "2rem" }}
            name="code"
            rules={[{ required: true, message: Notification.pleaseEnter("code") }]}
          >
            <div className="w-full flex gap-[2rem]">
              <Input className="w-2/3" />
              <Button element="button" type="submit" className="w-1/3">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default EmailInput;

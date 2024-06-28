import { Button, Form, FormProps, Input, message, Modal } from "antd";
import cn from "classnames";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Typography from "@/components/Typography";
import NOTIFICATION from "@/constants/notification";
import { AuthContext } from "@/providers/AuthProvider";
import { User } from "@/types/data";
import { FormVerifyEmail } from "@/types/form";
import { BaseResponse } from "@/types/response";

import styles from "./styles.module.scss";

type EmailInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  isVerified: boolean;
  username: string;
  token: string;
};

const EmailInput = ({ value, onChange, isVerified, username, token }: EmailInputProps) => {
  const authContext = React.use(AuthContext);
  const [formVerifyEmail] = Form.useForm<FormVerifyEmail>();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const headerRequest = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const baseBody = {
    username: username,
    email: value,
  };

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

    if (response.code === "OK") {
      setIsModalOpen(false);
      message.success(NOTIFICATION.SUCCESS_VERIFIED("Email"));
      await authContext?.refreshUser();
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
            className={cn("block flex-1", {
              [styles.success]: isVerified,
            })}
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
              <Typography className="span" fontSize="sm">
                Code
              </Typography>
            }
            style={{ width: "75%", padding: "0 4rem", margin: "auto", marginTop: "2rem" }}
            name="code"
            rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("code") }]}
          >
            <div className="w-full flex gap-[2rem]">
              <Input className="w-2/3" />
              <Button type="primary" htmlType="submit" className="w-1/3">
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

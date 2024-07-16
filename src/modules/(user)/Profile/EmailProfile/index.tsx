import { Checkbox, Divider, Form, FormProps, message, Popover } from "antd";
import React from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import AXIOS_INSTANCE from "@/services/instance";
import { User } from "@/types/data";
import { FormUpdateEmail, FormUpdateUserSetting } from "@/types/form";
import { BaseResponse } from "@/types/response";

import EmailInput from "./EmailInput";
import styles from "./styles.module.scss";

const EmailProfile = ({ user, token }: { user: User; token: string }) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateEmail>();
  const [formSetting] = Form.useForm<FormUpdateUserSetting>();

  const onFinishSetting: FormProps<FormUpdateUserSetting>["onFinish"] = async (values: FormUpdateUserSetting) => {
    const response = (
      await AXIOS_INSTANCE.put<BaseResponse<User>>("/users/mine/setting", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;

    if (response.code === StatusCode.OK) {
      authContext?.refreshUser();
      message.success(Notification.updateSuccess("Setting"));
    }
  };

  React.useEffect(() => {
    form.setFieldsValue(user);
    formSetting.setFieldsValue(user);
  }, [user]);

  return (
    <Container className="h-full" style={{ padding: 0, gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}>
      <Form layout="vertical" form={form} initialValues={{ email: user.email }} className="col-start-4 col-span-2">
        <Popover
          content={
            user.verifiedUser && (
              <Typography fontSize="sm" italic align="center">
                Verified
              </Typography>
            )
          }
        >
          <Form.Item<FormUpdateEmail>
            label={
              <Typography tag="span" fontSize="sm">
                Email
              </Typography>
            }
            name="email"
            rules={[{ type: "email", message: Notification.invalid("email") }]}
          >
            <EmailInput isVerified={user.verifiedUser} username={user.username} token={token} />
          </Form.Item>
        </Popover>
      </Form>

      <Divider
        className="col-start-4 col-span-2"
        style={{
          margin: 0,
        }}
      />

      <Form
        layout="vertical"
        form={formSetting}
        onFinish={onFinishSetting}
        initialValues={{ receiveNews: user.receiveNews, twoStepVerification: user.twoStepVerification }}
        className="col-start-4 col-span-2"
      >
        <div className="mb-[1.5rem]">
          <Popover
            content={
              !user.verifiedUser && (
                <Typography fontSize="sm" italic align="center">
                  Enable when your email is verified
                </Typography>
              )
            }
          >
            <Form.Item<FormUpdateUserSetting> name="receiveNews" valuePropName="checked" className="mb-0">
              <Checkbox disabled={!user.verifiedUser}>Receive news</Checkbox>
            </Form.Item>
            <Form.Item<FormUpdateUserSetting> name="twoStepVerification" valuePropName="checked" className="mb-0">
              <Checkbox disabled={!user.verifiedUser}>Two-factor authentication</Checkbox>
            </Form.Item>
          </Popover>
        </div>

        <Button element="button" type="submit" className={styles.saveBtn}>
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default EmailProfile;

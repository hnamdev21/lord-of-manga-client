import { Button, Checkbox, Divider, Form, FormProps, message, Popover } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { AuthContext } from "@/providers/AuthProvider";
import { User } from "@/types/data";
import { FormUpdateEmail, FormUpdateUserSetting } from "@/types/form";
import { BaseResponse } from "@/types/response";

import EmailInput from "./EmailInput";

const EmailProfile = ({ user, token }: { user: User; token: string }) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateEmail>();
  const [formSetting] = Form.useForm<FormUpdateUserSetting>();

  const isVerified = user.roles.some((role) => role.name === "USER");

  const onFinishSetting: FormProps<FormUpdateUserSetting>["onFinish"] = async (values: FormUpdateUserSetting) => {
    await AXIOS_INSTANCE.put<BaseResponse<User>>("/users/mine/setting", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await authContext?.refreshUser();

    message.success("Update setting successfully");
  };

  React.useEffect(() => {
    form.setFieldsValue(user);
    formSetting.setFieldsValue(user);
  }, [user]);

  return (
    <Container className="h-full" style={{ padding: 0, gridTemplateColumns: "repeat(10, minmax(0, 1fr))", gap: "2rem" }}>
      <Form layout="vertical" form={form} initialValues={{ email: user.email }} className="col-start-4 col-span-2">
        <Popover
          content={
            isVerified && (
              <Typography fontSize="sm" italic align="center">
                Verified
              </Typography>
            )
          }
        >
          <Form.Item<FormUpdateEmail>
            label={
              <Typography className="span" fontSize="sm">
                Email
              </Typography>
            }
            name="email"
            rules={[{ type: "email", message: "Invalid email. Example: example@gmail.com" }]}
          >
            <EmailInput isVerified={isVerified} username={user.username} token={token} />
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
              !isVerified && (
                <Typography fontSize="sm" italic align="center">
                  Enable when your email is verified
                </Typography>
              )
            }
          >
            <Form.Item<FormUpdateUserSetting> name="receiveNews" valuePropName="checked" className="mb-0">
              <Checkbox disabled={!isVerified}>Receive news</Checkbox>
            </Form.Item>
            <Form.Item<FormUpdateUserSetting> name="twoStepVerification" valuePropName="checked" className="mb-0">
              <Checkbox disabled={!isVerified}>Two-factor authentication</Checkbox>
            </Form.Item>
          </Popover>
        </div>

        <Form.Item<FormUpdateUserSetting>>
          <Button type="primary" htmlType="submit" className="block w-full">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default EmailProfile;
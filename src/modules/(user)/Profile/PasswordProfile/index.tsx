import { Button, Form, FormProps, Input, message, Modal } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { AuthContext } from "@/providers/AuthProvider";
import { User } from "@/types/data";
import { FormTwoFactorAuthentication, FormUpdatePassword } from "@/types/form";
import { BaseResponse } from "@/types/response";

const PasswordProfile = ({ token }: { user: User; token: string }) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdatePassword>();
  const [formTwoFA] = Form.useForm<FormTwoFactorAuthentication>();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FormUpdatePassword>["onFinish"] = async (values: FormUpdatePassword) => {
    if (authContext?.user?.twoStepVerification) {
      AXIOS_INSTANCE.post<BaseResponse<User>>("/mail/two-factor-authentication", {
        ...values,
        username: authContext?.user.username,
        email: authContext.user.email,
      });
      setIsModalOpen(true);
      return;
    }

    const response = (
      await AXIOS_INSTANCE.put<BaseResponse<User>>("/users/mine/password", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;

    if (response.code === "OK") {
      message.success("Update password successfully");
      setIsModalOpen(false);
    } else {
      message.error(response.message);
    }

    form.resetFields();
  };

  const onFinishTwoFA: FormProps<FormTwoFactorAuthentication>["onFinish"] = async (values: FormTwoFactorAuthentication) => {
    const dataUpdatePassword = form.getFieldsValue();

    const response = (
      await AXIOS_INSTANCE.put<BaseResponse<User>>(
        "/users/mine/password",
        { ...dataUpdatePassword, ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;

    if (response.code === "OK") {
      message.success("Update password successfully");
      setIsModalOpen(false);
    } else {
      message.error(response.message);
    }

    formTwoFA.resetFields();
    form.resetFields();
  };

  return (
    <React.Fragment>
      <Container className="h-full" style={{ padding: 0, gridTemplateColumns: "repeat(10, minmax(0, 1fr))", gap: "2rem" }}>
        <Form layout="vertical" form={form} onFinish={onFinish} className="col-start-4 col-span-2">
          <Form.Item<FormUpdatePassword>
            label={
              <Typography className="span" fontSize="sm">
                Old password
              </Typography>
            }
            name="oldPassword"
            rules={[{ required: true, message: "Please enter old password" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item<FormUpdatePassword>
            label={
              <Typography className="span" fontSize="sm">
                New password
              </Typography>
            }
            name="newPassword"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item<FormUpdatePassword>>
            <Button type="primary" htmlType="submit" className="block w-full">
              Change
            </Button>
          </Form.Item>
        </Form>
      </Container>

      <Modal
        title={
          <Typography tag="h2" fontSize="lg" align="center">
            Two-step verification
          </Typography>
        }
        centered
        open={isModalOpen}
        onOk={handleClose}
        onCancel={handleClose}
        onClose={handleClose}
        footer={() => null}
      >
        <Form layout="vertical" form={formTwoFA} onFinish={onFinishTwoFA}>
          <Form.Item<FormTwoFactorAuthentication>
            label={
              <Typography className="span" fontSize="sm">
                Code
              </Typography>
            }
            style={{ width: "75%", padding: "0 4rem", margin: "auto", marginTop: "2rem" }}
            name="code"
            rules={[{ required: true, message: "Please enter verification code" }]}
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

export default PasswordProfile;

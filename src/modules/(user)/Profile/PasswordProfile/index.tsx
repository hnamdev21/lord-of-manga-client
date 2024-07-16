import { Form, FormProps, Input, message, Modal } from "antd";
import React from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import StatusCode from "@/constants/status-code";
import { AuthContext } from "@/providers/AuthProvider";
import AXIOS_INSTANCE from "@/services/instance";
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

  const handleResponse = (response: BaseResponse<User>) => {
    if (response.code === StatusCode.OK) {
      message.success(Notification.updateSuccess("Password"));
      setIsModalOpen(false);
    }

    formTwoFA.resetFields();
    form.resetFields();
  };

  const sendRequest = async (values: FormUpdatePassword & Partial<FormTwoFactorAuthentication>) => {
    const response = (
      await AXIOS_INSTANCE.put<BaseResponse<User>>("/users/mine/password", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;

    handleResponse(response);
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

    sendRequest(values);
  };

  const onFinishTwoFA: FormProps<FormTwoFactorAuthentication>["onFinish"] = async (values: FormTwoFactorAuthentication) => {
    const dataUpdatePassword = form.getFieldsValue();

    sendRequest({ ...dataUpdatePassword, ...values });
  };

  return (
    <React.Fragment>
      <Container className="h-full" style={{ padding: 0, gridTemplateColumns: "repeat(10, minmax(0, 1fr))", gap: "2rem" }}>
        <Form layout="vertical" form={form} onFinish={onFinish} className="col-start-4 col-span-2">
          <Form.Item<FormUpdatePassword>
            label={
              <Typography tag="span" fontSize="sm">
                Old password
              </Typography>
            }
            name="oldPassword"
            rules={[{ required: true, message: Notification.pleaseEnter("old password") }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FormUpdatePassword>
            label={
              <Typography tag="span" fontSize="sm">
                New password
              </Typography>
            }
            name="newPassword"
            rules={[{ required: true, message: Notification.pleaseEnter("new password") }]}
          >
            <Input.Password />
          </Form.Item>

          <Button element="button" type="submit" shape="full">
            Change
          </Button>
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
              <Typography tag="span" fontSize="sm">
                Code
              </Typography>
            }
            style={{ width: "75%", padding: "0 4rem", margin: "auto", marginTop: "2rem" }}
            name="code"
            rules={[{ required: true, message: "Please enter verification code" }]}
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

export default PasswordProfile;

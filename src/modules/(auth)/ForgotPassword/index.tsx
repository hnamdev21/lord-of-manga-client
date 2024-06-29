"use client";

import { Form, FormProps, Input, Modal } from "antd";
import React from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import NOTIFICATION from "@/constants/notification";
import { FormForgotPassword, FormResetPassword } from "@/types/form";

const ForgotPasswordModule = () => {
  const [form] = Form.useForm<FormForgotPassword>();

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [_formValues, setFormValues] = React.useState<FormForgotPassword | null>(null);

  const onFinish: FormProps<FormForgotPassword>["onFinish"] = async (_values: FormForgotPassword) => {
    // Fake user is verified, and mail is sent
    const c = true;
    if (c) {
      setIsModalOpen(true);
      setFormValues(_values);
    }
  };

  const onFinishFormTwoFA: FormProps<FormResetPassword>["onFinish"] = async (_values: FormResetPassword) => {
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="col-span-12">
          <Typography tag="h1" fontSize="2xl" align="center">
            Forgot Password
          </Typography>
        </div>

        <Form layout="vertical" form={form} onFinish={onFinish} className="col-start-6 col-span-2">
          <Form.Item<FormForgotPassword>
            label={
              <Typography className="span" fontSize="sm">
                Email
              </Typography>
            }
            name="email"
            rules={[
              { required: true, message: NOTIFICATION.PLEASE_ENTER("email") },
              { type: "email", message: NOTIFICATION.INVALID("email") },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FormForgotPassword>>
            <Button element="button" type="submit" className="block w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Container>

      <Modal
        title={
          <Typography tag="h2" fontSize="lg" align="center">
            Reset Password
          </Typography>
        }
        centered
        open={isModalOpen}
        onOk={handleClose}
        onCancel={handleClose}
        onClose={handleClose}
        footer={() => null}
      >
        <Form layout="vertical" onFinish={onFinishFormTwoFA} className="col-start-6 col-span-2">
          <div className="w-3/4 px-[4rem] mx-auto mt-[2rem]">
            <Form.Item<FormResetPassword>
              label={
                <Typography className="span" fontSize="sm">
                  Password
                </Typography>
              }
              name="password"
              rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("password") }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FormResetPassword>
              label={
                <Typography className="span" fontSize="sm">
                  Confirm Password
                </Typography>
              }
              name="confirmPassword"
              rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("confirm password") }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FormResetPassword>
              label={
                <Typography className="span" fontSize="sm">
                  Code
                </Typography>
              }
              name="code"
              rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("code") }]}
            >
              <div className="w-full flex gap-[2rem]">
                <Input className="w-2/3" />
                <Button type="button" element="button" variant="outline" className="w-1/3">
                  Resend
                </Button>
              </div>
            </Form.Item>

            <Button element="button" type="submit" className="block w-full">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ForgotPasswordModule;

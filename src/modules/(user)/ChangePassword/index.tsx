"use client";

import { Button, Form, FormProps, Input, Modal } from "antd";
import React from "react";

import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { FormChangePassword, FormTwoFactorAuthentication } from "@/types/form";

const ChangePasswordModule = () => {
  const [form] = Form.useForm<FormChangePassword>();
  const [formTwoFA] = Form.useForm<FormTwoFactorAuthentication>();

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [_formValues, setFormValues] = React.useState<FormChangePassword | null>(null);

  const onFinish: FormProps<FormChangePassword>["onFinish"] = async (_values: FormChangePassword) => {
    // Fake user turn on two factor authentication
    const c = true;
    if (c) {
      setIsModalOpen(true);
      setFormValues(_values);
      console.log("[ChangePasswordModule] :: values ::::", _values);
    }
  };

  const onFinishFormTwoFA: FormProps<FormTwoFactorAuthentication>["onFinish"] = async (_values: FormTwoFactorAuthentication) => {
    setIsModalOpen(false);
    formTwoFA.resetFields();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="col-span-12">
          <Typography tag="h1" fontSize="2xl" align="center">
            Change Password
          </Typography>
        </div>

        <Form layout="vertical" form={form} onFinish={onFinish} className="col-start-6 col-span-2">
          <Form.Item<FormChangePassword>
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

          <Form.Item<FormChangePassword>
            label={
              <Typography className="span" fontSize="sm">
                New password
              </Typography>
            }
            name="newPassword"
            rules={[{ required: true, message: "Please enter new password" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item<FormChangePassword>>
            <Button type="primary" htmlType="submit" className="block w-full">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Container>

      <Modal
        title={
          <Typography tag="h2" fontSize="lg" align="center">
            Two Factor Authentication
          </Typography>
        }
        centered
        open={isModalOpen}
        onOk={handleClose}
        onCancel={handleClose}
        onClose={handleClose}
        footer={() => null}
      >
        <Form layout="vertical" form={formTwoFA} onFinish={onFinishFormTwoFA} className="col-start-6 col-span-2">
          <Form.Item<FormTwoFactorAuthentication>
            className="w-3/4 px-[4rem] mx-auto mt-[2rem]"
            label={
              <Typography className="span" fontSize="sm">
                Code
              </Typography>
            }
            name="code"
            rules={[{ required: true, message: "Please enter two-factor authentication code" }]}
          >
            <div className="w-full flex gap-[2rem]">
              <Input className="w-2/3" />
              <Button type="primary" htmlType="submit" className="w-1/3">
                Change
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ChangePasswordModule;

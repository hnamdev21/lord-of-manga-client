"use client";

import { Button, Form, FormProps, Input } from "antd";
import React from "react";

import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { FormChangePassword } from "@/types/form";

const ChangePasswordModule = () => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FormChangePassword>["onFinish"] = async (_values: FormChangePassword) => {
    //
  };

  return (
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
  );
};

export default ChangePasswordModule;

"use client";

import { Button, Form, Input } from "antd";
import React from "react";

import Container from "@/components/Container";
import Typography from "@/components/Typography";

const ChangePasswordModule = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
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
        <Form.Item
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

        <Form.Item
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

        <Form.Item
          label={
            <Typography className="span" fontSize="sm">
              Code
            </Typography>
          }
          name="code"
        >
          <div className="flex gap-[2rem]">
            <Input className="w-2/3" />
            <Button type="dashed" htmlType="submit" className="w-1/3">
              Send code
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="block w-full">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default ChangePasswordModule;

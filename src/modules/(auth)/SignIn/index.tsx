"use client";

import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import React from "react";

import Typography from "@/components/Typography";
import { FormSignIn } from "@/types/form";

const SignInModule = () => {
  const onFinish: FormProps<FormSignIn>["onFinish"] = async (values) => {
    //
  };

  return (
    <React.Fragment>
      <div>
        <Typography tag="h1" fontSize="2xl" align="center" className="mb-[1.6rem]">
          Welcome to Lord of Manga
        </Typography>
      </div>

      <div
        className="grid grid-cols-12 gap-[2rem] rounded-2xl py-[4rem]"
        style={{
          backgroundColor: "var(--color-dark-gray)",
        }}
      >
        <Form layout={"vertical"} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" className="col-start-4 col-span-6">
          <Form.Item<FormSignIn>
            label={
              <Typography className="span" fontSize="sm">
                Username
              </Typography>
            }
            name="username"
            rules={[{ required: true, type: "string", message: "Please enter your username" }]}
          >
            <Input placeholder={"example"} />
          </Form.Item>

          <Form.Item<FormSignIn>
            label={
              <Typography className="span" fontSize="sm">
                Password
              </Typography>
            }
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder={"********"} />
          </Form.Item>

          <Form.Item<FormSignIn> name="remember" valuePropName="checked">
            <div className={"w-full flex items-center justify-between"}>
              <Checkbox
                style={{
                  color: "var(--color-light)",
                }}
              >
                Remember me
              </Checkbox>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              style={{
                backgroundColor: "var(--color-primary)",
              }}
              className={"w-full"}
              htmlType="submit"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default SignInModule;

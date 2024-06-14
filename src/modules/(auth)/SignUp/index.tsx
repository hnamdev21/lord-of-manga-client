"use client";

import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import React from "react";

import Typography from "@/components/Typography";
import { FormSignUp } from "@/types/form";

const SignUpModule = () => {
  const onFinish: FormProps<FormSignUp>["onFinish"] = async (_values: FormSignUp) => {
    //
  };

  return (
    <React.Fragment>
      <Typography tag="h1" fontSize="2xl" align="center" className="mb-[1.6rem]">
        Welcome to Lord of Manga
      </Typography>

      <div
        className="grid grid-cols-12 gap-[2rem] rounded-2xl py-[4rem]"
        style={{
          backgroundColor: "var(--color-dark-gray)",
        }}
      >
        <Form layout={"vertical"} onFinish={onFinish} autoComplete="off" className="col-start-4 col-span-6">
          <Form.Item<FormSignUp>
            label={
              <Typography className="span" fontSize="sm">
                Full name
              </Typography>
            }
            name="fullName"
            rules={[{ required: true, type: "string", message: "Please enter your fullName" }]}
          >
            <Input placeholder={"Example Ham"} />
          </Form.Item>

          <Form.Item<FormSignUp>
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

          <Form.Item<FormSignUp>
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

          <Form.Item<FormSignUp>
            label={
              <Typography className="span" fontSize="sm">
                Email
              </Typography>
            }
            name="password"
            rules={[{ type: "email", message: "Please enter your email" }]}
          >
            <Input placeholder={"example@gmail.com"} />
          </Form.Item>

          <Form.Item<FormSignUp> name="receiveNews" valuePropName="checked">
            <div className={"w-full flex items-center justify-between"}>
              <Checkbox
                style={{
                  color: "var(--color-light)",
                }}
              >
                Receive news
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default SignUpModule;

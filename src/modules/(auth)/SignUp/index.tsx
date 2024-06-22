"use client";

import { Button, Checkbox, Form, type FormProps, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import Path from "@/constants/path";
import { User } from "@/types/data";
import { FormSignUp } from "@/types/form";
import { BaseResponse } from "@/types/response";

const SignUpModule = () => {
  const router = useRouter();

  const onFinish: FormProps<FormSignUp>["onFinish"] = async (values: FormSignUp) => {
    const response = (await AXIOS_INSTANCE.post<BaseResponse<User>>("/users", values)).data;

    if (response.code === "CREATED") {
      message.success(response.message);
      router.push(Path.AUTH.SIGN_IN);
    } else if (response.code === "CONFLICT") {
      message.error("Username or email already exists");
    }
  };

  return (
    <React.Fragment>
      <Typography tag="h1" fontSize="2xl" align="center" className="mb-[1.6rem]">
        Welcome to Lord of Manga
      </Typography>

      <div className="grid grid-cols-10 gap-[.5rem]">
        <div className="col-start-3 col-span-6 p-[2rem] bg-[var(--color-dark-gray)] rounded-2xl">
          <Form
            layout={"vertical"}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              fullName: "",
              username: "",
              password: "",
              email: "",
              receiveNews: false,
            }}
          >
            <div className="w-full h-[8rem] mb-[2rem] flex justify-center">
              <Logo />
            </div>

            <Form.Item<FormSignUp>
              label={
                <Typography className="span" fontSize="sm">
                  Full name
                </Typography>
              }
              name="fullName"
              rules={[{ required: true, type: "string", message: "Please enter your full name" }]}
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
              name="email"
              rules={[{ type: "email", message: "Please enter your email" }]}
            >
              <Input placeholder={"example@gmail.com"} />
            </Form.Item>

            <Form.Item<FormSignUp> name="receiveNews" valuePropName="checked">
              <div className="w-full flex items-center justify-between">
                <Checkbox
                  style={{
                    color: "var(--color-light)",
                  }}
                >
                  Receive news
                </Checkbox>
              </div>
            </Form.Item>

            <Button type="primary" className="block w-full mb-[1rem] bg-[var(--color-primary)]" htmlType="submit">
              Sign Up
            </Button>

            <Typography fontSize="sm" align="center">
              Already have an account?{" "}
              <Link href={Path.AUTH.SIGN_IN} className="underline underline-offset-2">
                Sign In
              </Link>
            </Typography>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUpModule;

"use client";

import { Button, Checkbox, Form, type FormProps, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import Path from "@/constants/path";
import { AuthContext } from "@/providers/AuthProvider";
import { FormSignIn } from "@/types/form";
import { BaseResponse } from "@/types/response";

const SignInModule = () => {
  const router = useRouter();
  const authContext = React.use(AuthContext);

  const onFinish: FormProps<FormSignIn>["onFinish"] = async (values: FormSignIn) => {
    const response = (await AXIOS_INSTANCE.post<BaseResponse<string>>("/auth/sign-in", values)).data;

    if (response.code === "OK") {
      message.success("Welcome to Lord of Manga!");
      authContext?.signIn(response.data);
      router.push(Path.USER.HOME);
    } else if (response.code === "BAD_REQUEST") {
      message.error("Username or password is incorrect");
    }
  };

  return (
    <React.Fragment>
      <div>
        <Typography tag="h1" fontSize="2xl" align="center" className="mb-[1.6rem]">
          Welcome to Lord of Manga
        </Typography>
      </div>

      <div className="grid grid-cols-10 gap-[.5rem]">
        <div className="col-start-3 col-span-6 p-[2rem] bg-[var(--color-dark-gray)] rounded-2xl">
          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            <div className="w-full h-[8rem] mb-[2rem] flex justify-center">
              <Logo />
            </div>

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
              <div className="w-full flex items-center justify-between">
                <Checkbox>Remember me</Checkbox>
              </div>
            </Form.Item>

            <Button type="primary" className="block w-full mb-[1rem] bg-[var(--color-primary)]" htmlType="submit">
              Sign In
            </Button>

            <Typography fontSize="sm" align="center">
              Don&apos;t have an account?{" "}
              <Link href={Path.AUTH.SIGN_UP} className="underline underline-offset-2">
                Sign Up
              </Link>
            </Typography>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignInModule;

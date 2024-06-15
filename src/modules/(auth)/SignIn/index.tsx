"use client";

import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import Link from "next/link";
import React from "react";

import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import Path from "@/constants/path";
import { FormSignIn } from "@/types/form";

const SignInModule = () => {
  const onFinish: FormProps<FormSignIn>["onFinish"] = async (_values: FormSignIn) => {
    //
  };

  return (
    <React.Fragment>
      <div>
        <Typography tag="h1" fontSize="2xl" align="center" className="mb-[1.6rem]">
          Welcome to Lord of Manga
        </Typography>
      </div>

      <div className="grid grid-cols-10 gap-[.5rem]">
        <Form
          layout={"vertical"}
          onFinish={onFinish}
          autoComplete="off"
          className="rounded-2xl col-start-3 col-span-6 p-[2rem]"
          style={{
            backgroundColor: "var(--color-dark-gray)",
          }}
        >
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

          <Button
            type="primary"
            style={{
              backgroundColor: "var(--color-primary)",
            }}
            className="block w-full mb-[1rem]"
            htmlType="submit"
          >
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
    </React.Fragment>
  );
};

export default SignInModule;

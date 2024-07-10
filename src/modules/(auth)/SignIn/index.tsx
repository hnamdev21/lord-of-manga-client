"use client";

import { Checkbox, Form, type FormProps, Input, message } from "antd";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaLock, FaUser } from "react-icons/fa";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import Path from "@/constants/path";
import { AuthContext } from "@/providers/AuthProvider";
import { FormSignIn } from "@/types/form";
import { BaseResponse } from "@/types/response";

import styles from "./styles.module.scss";

const SignInModule = () => {
  const router = useRouter();
  const authContext = React.use(AuthContext);

  const onFinish: FormProps<FormSignIn>["onFinish"] = async (values: FormSignIn) => {
    const response = (await AXIOS_INSTANCE.post<BaseResponse<string>>("/auth/sign-in", values)).data;

    if (response.code === "OK") {
      message.success(Notification.WELCOME);
      authContext?.signIn(response.data);
      router.push(Path.USER.HOME);
    }
  };

  return (
    <React.Fragment>
      <div>
        <Typography tag="h1" fontSize="2xl" align="center" className={styles.title}>
          Welcome to Lord of Manga
        </Typography>
      </div>

      <div className={cn("grid grid-cols-6 gap-[2rem]", styles.container)}>
        <div className={cn("col-start-2 col-span-4", styles.inner)}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              remember: false,
            }}
            className={styles.form}
          >
            <Form.Item<FormSignIn> name="username" rules={[{ required: true, type: "string", message: Notification.PLEASE_ENTER("username") }]}>
              <Input placeholder="Username" prefix={<FaUser />} />
            </Form.Item>

            <Form.Item<FormSignIn> name="password" rules={[{ required: true, message: Notification.PLEASE_ENTER("password") }]}>
              <Input.Password placeholder="Password" prefix={<FaLock />} />
            </Form.Item>

            <Form.Item<FormSignIn> name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Button element="button" type="submit" shape="full">
              Sign In
            </Button>
          </Form>

          <Typography fontSize="sm" align="center">
            Don&apos;t have an account?{" "}
            <Link href={Path.AUTH.SIGN_UP} className={styles.link}>
              Sign Up
            </Link>
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignInModule;

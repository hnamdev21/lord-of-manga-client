"use client";

import { Button, Checkbox, Form, type FormProps, Input, message } from "antd";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEnvelope, FaIdCard, FaLock, FaUser } from "react-icons/fa";

import AXIOS_INSTANCE from "@/apis/instance";
import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import NOTIFICATION from "@/constants/notification";
import Path from "@/constants/path";
import { User } from "@/types/data";
import { FormSignUp } from "@/types/form";
import { BaseResponse } from "@/types/response";

import styles from "./styles.module.scss";

const SignUpModule = () => {
  const router = useRouter();

  const onFinish: FormProps<FormSignUp>["onFinish"] = async (values: FormSignUp) => {
    const response = (await AXIOS_INSTANCE.post<BaseResponse<User>>("/users", values)).data;

    if (response.code === "CREATED") {
      message.success(NOTIFICATION.WELCOME);
      router.push(Path.AUTH.SIGN_IN);
    }
  };

  return (
    <React.Fragment>
      <Typography tag="h1" fontSize="2xl" align="center" className={styles.title}>
        Welcome to Lord of Manga
      </Typography>

      <div className={cn("grid grid-cols-6 gap-[2rem]", styles.container)}>
        <div className={cn("col-start-2 col-span-4", styles.inner)}>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              receiveNews: false,
            }}
            className={styles.form}
          >
            <div className={styles.logoContainer}>
              <Logo />
            </div>

            <Form.Item<FormSignUp> name="fullName" rules={[{ required: true, type: "string", message: NOTIFICATION.PLEASE_ENTER("full name") }]}>
              <Input placeholder="Full name" prefix={<FaIdCard />} />
            </Form.Item>

            <Form.Item<FormSignUp> name="username" rules={[{ required: true, type: "string", message: NOTIFICATION.PLEASE_ENTER("username") }]}>
              <Input placeholder="Username" prefix={<FaUser />} />
            </Form.Item>

            <Form.Item<FormSignUp> name="password" rules={[{ required: true, message: NOTIFICATION.PLEASE_ENTER("password") }]}>
              <Input.Password placeholder="Password" prefix={<FaLock />} />
            </Form.Item>

            <Form.Item<FormSignUp> name="email" rules={[{ type: "email", message: NOTIFICATION.INVALID("email") }]}>
              <Input placeholder="Email" prefix={<FaEnvelope />} />
            </Form.Item>

            <Form.Item<FormSignUp> name="receiveNews" valuePropName="checked">
              <Checkbox>Receive news</Checkbox>
            </Form.Item>

            <Button type="primary" className="block w-full" htmlType="submit">
              Sign Up
            </Button>
          </Form>

          <Typography fontSize="sm" align="center">
            Already have an account?{" "}
            <Link href={Path.AUTH.SIGN_IN} className={styles.link}>
              Sign In
            </Link>
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUpModule;

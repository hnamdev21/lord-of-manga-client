"use client";

import { Checkbox, Form, type FormProps, Input, message } from "antd";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaAt, FaIdCard, FaLock, FaUser } from "react-icons/fa";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import Notification from "@/constants/notification";
import Path from "@/constants/path";
import StatusCode from "@/constants/status-code";
import { UserAPI } from "@/services/apis/user";
import { FormSignUp } from "@/types/form";

import styles from "./styles.module.scss";

const SignUpModule = () => {
  const router = useRouter();

  const onFinish: FormProps<FormSignUp>["onFinish"] = async (values: FormSignUp) => {
    const response = await UserAPI.signUp({ formData: values });

    if (response.code === StatusCode.CREATED) {
      message.success(Notification.welcome);
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
          <div className={styles.logoContainer}>
            <Logo />
          </div>

          <Form
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              receiveNews: false,
            }}
            className={styles.form}
          >
            <Form.Item<FormSignUp> name="fullName" rules={[{ required: true, type: "string", message: Notification.pleaseEnter("full name") }]}>
              <Input placeholder="Full name" prefix={<FaIdCard />} />
            </Form.Item>

            <Form.Item<FormSignUp> name="username" rules={[{ required: true, type: "string", message: Notification.pleaseEnter("username") }]}>
              <Input placeholder="Username" prefix={<FaUser />} />
            </Form.Item>

            <Form.Item<FormSignUp> name="password" rules={[{ required: true, message: Notification.pleaseEnter("password") }]}>
              <Input.Password placeholder="Password" prefix={<FaLock />} />
            </Form.Item>

            <Form.Item<FormSignUp> name="email" rules={[{ type: "email", message: Notification.invalid("email") }]}>
              <Input placeholder="Email" prefix={<FaAt />} />
            </Form.Item>

            <Form.Item<FormSignUp> name="receiveNews" valuePropName="checked">
              <Checkbox>Receive news</Checkbox>
            </Form.Item>

            <Button element="button" type="submit" shape="full">
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

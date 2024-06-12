"use client";

import { Button, Checkbox, Form as FormAnt, type FormProps, Input } from "antd";
import React from "react";

import Typography from "@/components/Typography";
import { FormSignUp } from "@/types/form";

import styles from "./styles.module.scss";

type FieldType = FormSignUp;

const SignUpModule = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setIsLoading(true);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (_errorInfo) => {
    //
  };

  return (
    <React.Fragment>
      <div>
        <Typography tag="h1" fontSize="2xl" align="center" className="mb-[1.6rem]">
          Welcome to Lord of Manga
        </Typography>
      </div>

      <div className={styles.container}>
        <FormAnt name="basic" layout={"vertical"} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <FormAnt.Item<FieldType>
            label={
              <Typography className="span" fontSize="sm">
                Full name
              </Typography>
            }
            name="fullName"
            rules={[{ required: true, type: "string", message: "Please enter your fullName" }]}
          >
            <Input size={"large"} placeholder={"Example Ham"} />
          </FormAnt.Item>

          <FormAnt.Item<FieldType>
            label={
              <Typography className="span" fontSize="sm">
                Username
              </Typography>
            }
            name="username"
            rules={[{ required: true, type: "string", message: "Please enter your username" }]}
          >
            <Input size={"large"} placeholder={"example"} />
          </FormAnt.Item>

          <FormAnt.Item<FieldType>
            label={
              <Typography className="span" fontSize="sm">
                Password
              </Typography>
            }
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password size={"large"} placeholder={"********"} />
          </FormAnt.Item>

          <FormAnt.Item<FieldType>
            label={
              <Typography className="span" fontSize="sm">
                Email
              </Typography>
            }
            name="password"
            rules={[{ type: "email", message: "Please enter your email" }]}
          >
            <Input size={"large"} placeholder={"example@gmail.com"} />
          </FormAnt.Item>

          <FormAnt.Item<FieldType> name="receiveNews" valuePropName="checked">
            <div className={"w-full flex items-center justify-between"}>
              <Checkbox
                style={{
                  color: "var(--color-light)",
                }}
              >
                Receive news
              </Checkbox>
            </div>
          </FormAnt.Item>

          <FormAnt.Item>
            <Button
              type="primary"
              style={{
                backgroundColor: "var(--color-primary)",
              }}
              className={"w-full"}
              size={"large"}
              htmlType="submit"
            >
              Sign Up
            </Button>
          </FormAnt.Item>
        </FormAnt>
      </div>
    </React.Fragment>
  );
};

export default SignUpModule;

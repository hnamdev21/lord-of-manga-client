"use client";

import { Button, Checkbox, Form as FormAnt, type FormProps, Input } from "antd";
import React from "react";

import Typography from "@/components/Typography";
import { FormSignIn } from "@/types/form";

import styles from "./styles.module.scss";

type FieldType = FormSignIn;

const SignInModule = () => {
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
                Username
              </Typography>
            }
            name="username"
            rules={[{ required: true, type: "string", message: "Please enter your username" }]}
          >
            <Input placeholder={"example"} />
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
            <Input.Password placeholder={"********"} />
          </FormAnt.Item>

          <FormAnt.Item<FieldType> name="remember" valuePropName="checked">
            <div className={"w-full flex items-center justify-between"}>
              <Checkbox
                style={{
                  color: "var(--color-light)",
                }}
              >
                Remember me
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
              htmlType="submit"
            >
              Sign In
            </Button>
          </FormAnt.Item>
        </FormAnt>
      </div>
    </React.Fragment>
  );
};

export default SignInModule;

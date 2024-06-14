"use client";

import { Button, Divider, Form, FormProps, Input, Select, Switch } from "antd";
import React from "react";

import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { FormUpdateProfile } from "@/types/form";

const ProfileModule = () => {
  const onFinish: FormProps<FormUpdateProfile>["onFinish"] = (_values: FormUpdateProfile) => {
    //
  };

  return (
    <Container>
      <div className="col-span-12">
        <Typography tag="h1" fontSize="2xl" align="center">
          Profile
        </Typography>
      </div>

      <Form layout="vertical" onFinish={onFinish} className="col-start-5 col-span-4">
        <div className="flex gap-[2rem]">
          <Form.Item<FormUpdateProfile>
            label={
              <Typography className="span" fontSize="sm">
                Full name
              </Typography>
            }
            name="fullName"
            rules={[{ required: true, message: "Please enter full name" }]}
            className="w-2/3"
          >
            <Input placeholder="Example Ham" />
          </Form.Item>

          <Form.Item<FormUpdateProfile>
            label={
              <Typography className="span" fontSize="sm">
                Gender
              </Typography>
            }
            name="gender"
            rules={[{ required: true, message: "Please select full name" }]}
            className="w-1/3"
          >
            <Select id="gender" placeholder="-- Select gender --" options={[]} />
          </Form.Item>
        </div>

        <div className="flex gap-[2rem]">
          <Form.Item<FormUpdateProfile>
            label={
              <Typography className="span" fontSize="sm">
                Email
              </Typography>
            }
            name="fullName"
            rules={[{ type: "email", message: "Invalid email. Example: example@gmail.com" }]}
            className="w-2/3"
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>

          <div className="w-1/3 flex items-end pb-[2.4rem]">
            <Button type="dashed" className="block flex-1">
              Verify
            </Button>
          </div>
        </div>

        <Divider />

        <Form.Item<FormUpdateProfile> name={"receiveNews"}>
          <span className="flex items-center justify-between gap-[.5rem]">
            <Typography tag="span">Receive news</Typography>
            <Switch />
          </span>
        </Form.Item>
        <Form.Item<FormUpdateProfile> name={"two2fa"}>
          <span className="flex items-center justify-between gap-[.5rem]">
            <Typography tag="span">Two-factor authentication</Typography>
            <Switch />
          </span>
        </Form.Item>

        <Form.Item<FormUpdateProfile>>
          <Button type="primary" htmlType="submit" className="block w-full">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default ProfileModule;

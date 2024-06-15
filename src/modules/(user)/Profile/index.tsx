"use client";

import { Button, Divider, Form, FormProps, Input, Select, Switch } from "antd";
import { FieldNamesType } from "antd/es/cascader";
import cn from "classnames";
import Image from "next/image";
import React from "react";
import { FaCamera } from "react-icons/fa";

import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { GENDER_OPTIONS } from "@/constants/options";
import { FormUpdateProfile } from "@/types/form";
import { getBase64 } from "@/utils/imageUtils";

import styles from "./styles.module.scss";

const ProfileModule = () => {
  const user = {
    avatar: "",
  };
  const [base64Image, setBase64Image] = React.useState<string | null>(null);

  const avatarSrc = base64Image || user.avatar || "/images/avatar.jpg";

  const onFinish: FormProps<FormUpdateProfile>["onFinish"] = (_values: FormUpdateProfile) => {
    //
  };

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as FieldNamesType;

    if (file) {
      const base64 = await getBase64(file);
      setBase64Image(base64);
    }
  };

  return (
    <Container>
      <div className="col-span-12">
        <Typography tag="h1" fontSize="2xl" align="center">
          Profile
        </Typography>
      </div>

      <Form layout="vertical" onFinish={onFinish} className="col-start-5 col-span-4">
        <div className={cn("w-full flex justify-center", styles.container)}>
          <label htmlFor="avatar" className={`${styles.avatarContainer}`}>
            <Image src={avatarSrc} alt={`Avatar of ${"Example Ham"}`} width={400} height={400} className={`${styles.avatar}`} />
            <div className={`${styles.overlay}`}>
              <FaCamera />
            </div>
          </label>
          <input type="file" name="avatar" id="avatar" accept="image/*" className="hidden" onChange={onFileInputChange} />
        </div>

        <div className="flex gap-[2rem] mt-[4rem]">
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
            rules={[{ required: true, message: "Pease select gender" }]}
            className="w-1/3"
          >
            <Select id="gender" placeholder="-- Select gender --" options={GENDER_OPTIONS} />
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

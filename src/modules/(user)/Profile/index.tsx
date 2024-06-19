"use client";

import { Avatar, Button, Checkbox, Divider, Form, FormProps, Input, message, Select } from "antd";
import { FieldNamesType } from "antd/es/cascader";
import cn from "classnames";
import React from "react";
import { FaCamera } from "react-icons/fa";

import AXIOS_INSTANCE from "@/apis/instance";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { GENDER_OPTIONS } from "@/constants/options";
import { AuthContext } from "@/providers/AuthProvider";
import { User } from "@/types/data";
import { FormUpdateProfile } from "@/types/form";
import { BaseResponse } from "@/types/response";
import { getBase64 } from "@/utils/imageUtils";

import styles from "./styles.module.scss";

const ProfileModule = () => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateProfile>();

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [base64Image, setBase64Image] = React.useState<string | null>(null);

  const avatarSrc =
    base64Image ||
    (authContext?.user?.avatarPath ? `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/uploads/${authContext.user.avatarPath}` : null) ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const onFinish: FormProps<FormUpdateProfile>["onFinish"] = async (values: FormUpdateProfile) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("file", avatarFile as File);
    formData.append("receiveNews", values.receiveNews.toString());
    formData.append("twoStepVerification", values.twoStepVerification.toString());

    await AXIOS_INSTANCE.put<BaseResponse<User>>(
      "/users/mine",
      { ...values, file: avatarFile, receiveNews: values.receiveNews.toString(), twoStepVerification: values.twoStepVerification.toString() },
      {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await getMe();
    message.success("Update profile successfully");
  };

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as FieldNamesType;

    if (file) {
      const base64 = await getBase64(file);
      setBase64Image(base64);
      setAvatarFile(file as File);
    }
  };

  const getMe = async () => {
    const { data } = (
      await AXIOS_INSTANCE.get<BaseResponse<User>>("/users/mine", {
        headers: {
          Authorization: `Bearer ${authContext?.auth.token}`,
        },
      })
    ).data;

    authContext?.setUser(data);
    form.setFieldsValue(data);
  };

  React.useEffect(() => {
    authContext?.goToSignInIfNotAuthenticated();

    form.setFieldsValue(authContext?.user as User);
  }, [authContext?.user]);

  return (
    <Container>
      <div className="col-span-12">
        <Typography tag="h1" fontSize="2xl" align="center">
          Profile
        </Typography>
      </div>

      <Form layout="vertical" form={form} onFinish={onFinish} className="col-start-5 col-span-4">
        <div className={cn("w-full flex justify-center", styles.container)}>
          <label htmlFor="avatar" className={`${styles.avatarContainer}`}>
            <Avatar src={avatarSrc} size={120} className={`${styles.avatar}`} alt={`Avatar of ${"Example Ham"}`} />
            <div className={`${styles.overlay}`}>
              <FaCamera />
            </div>
          </label>
          <input type="file" name="avatar" id="avatar" accept="image/*" style={{ display: "none" }} onChange={onFileInputChange} />
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
            <Select options={GENDER_OPTIONS} />
          </Form.Item>
        </div>

        <div className="flex gap-[2rem]">
          <Form.Item<FormUpdateProfile>
            label={
              <Typography className="span" fontSize="sm">
                Email
              </Typography>
            }
            name="email"
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

        <Divider className="my-[1rem]" />

        <Form.Item<FormUpdateProfile> name="receiveNews" valuePropName="checked" className="my-[.5rem]">
          <Checkbox>Receive news</Checkbox>
        </Form.Item>
        <Form.Item<FormUpdateProfile> name="twoStepVerification" valuePropName="checked" className="my-[.5rem]">
          <Checkbox>Two-factor authentication</Checkbox>
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

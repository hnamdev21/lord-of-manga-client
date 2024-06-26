import { Avatar, Button, Form, FormProps, Input, message, Select } from "antd";
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
import { fromObjetToFomData } from "@/utils/utils";

import styles from "./styles.module.scss";

const BasicInformationProfile = ({ user, token }: { user: User; token: string }) => {
  const authContext = React.use(AuthContext);
  const [form] = Form.useForm<FormUpdateProfile>();

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [base64Image, setBase64Image] = React.useState<string | null>(null);

  const avatarSrc =
    base64Image ||
    (user.avatarPath ? `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/uploads/${user.avatarPath}` : null) ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const onFinish: FormProps<FormUpdateProfile>["onFinish"] = async (values: FormUpdateProfile) => {
    const formData = fromObjetToFomData({ ...values, file: avatarFile });

    await AXIOS_INSTANCE.put<BaseResponse<User>>("/users/mine", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    await authContext?.refreshUser();

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

  React.useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  return (
    <Container className="h-full" style={{ padding: 0, gridTemplateColumns: "repeat(10, minmax(0, 1fr))", gap: "2rem" }}>
      <Form layout="vertical" form={form} onFinish={onFinish} className="col-start-4 col-span-2">
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
            className="w-[60%]"
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
            className="w-[40%]"
          >
            <Select options={GENDER_OPTIONS} />
          </Form.Item>
        </div>

        <Form.Item<FormUpdateProfile>>
          <Button type="primary" htmlType="submit" className="block w-full">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default BasicInformationProfile;
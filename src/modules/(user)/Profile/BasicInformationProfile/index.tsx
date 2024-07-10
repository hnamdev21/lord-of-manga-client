import { Avatar, Form, FormProps, Input, message, Select } from "antd";
import { FieldNamesType } from "antd/es/cascader";
import cn from "classnames";
import React from "react";
import { FaCamera } from "react-icons/fa";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { localApiUrl } from "@/constants/config";
import Notification from "@/constants/notification";
import { GenderOptions } from "@/constants/options";
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
    (user.avatarPath ? `${localApiUrl}/uploads/${user.avatarPath}` : null) ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const onFinish: FormProps<FormUpdateProfile>["onFinish"] = async (values: FormUpdateProfile) => {
    const formData = fromObjetToFomData({ ...values, file: avatarFile });

    const response = (
      await AXIOS_INSTANCE.put<BaseResponse<User>>("/users/mine", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;

    if (response.code === "OK") {
      await authContext?.refreshUser();
      message.success(Notification.SUCCESS_UPDATED("Profile"));
    }
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
            <Avatar src={avatarSrc} size={120} className={`${styles.avatar}`} alt={`Avatar of ${user.fullName}`} />
            <div className={`${styles.overlay}`}>
              <FaCamera />
            </div>
          </label>
          <input type="file" name="avatar" id="avatar" accept="image/*" style={{ display: "none" }} onChange={onFileInputChange} />
        </div>

        <div className="flex gap-[2rem] mt-[4rem]">
          <Form.Item<FormUpdateProfile>
            label={
              <Typography tag="span" fontSize="sm">
                Full name
              </Typography>
            }
            name="fullName"
            rules={[{ required: true, message: Notification.PLEASE_ENTER("full name") }]}
            className="w-[60%]"
          >
            <Input />
          </Form.Item>

          <Form.Item<FormUpdateProfile>
            label={
              <Typography tag="span" fontSize="sm">
                Gender
              </Typography>
            }
            name="gender"
            rules={[{ required: true, message: Notification.PLEASE_SELECT("gender") }]}
            className="w-[40%]"
          >
            <Select options={GenderOptions} />
          </Form.Item>
        </div>

        <Button element="button" type="submit" shape="full">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default BasicInformationProfile;

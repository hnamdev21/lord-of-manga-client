import ApiPrefix from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { User } from "@/types/data";
import { BaseResponse } from "@/types/response";

import { ChangePasswordRequest, GetMyProfileRequest, SignUpRequest, UpdateProfileRequest, UpdateUserSettingsRequest } from "./dto";

export const signUp = async ({ formData }: SignUpRequest): Promise<BaseResponse<string>> => {
  const response = await AXIOS_INSTANCE.post(`/${ApiPrefix.USERS}`, formData);

  return response.data;
};

// export const verifyEmail = async ({ formData }: VerifyEmailRequest): Promise<BaseResponse<string>> => {
//   const response = await AXIOS_INSTANCE.post(`/${ApiPrefix.AUTH}/verify-email`, formData);

//   return response.data;
// };

export const updateProfile = async ({ token, formData }: UpdateProfileRequest): Promise<BaseResponse<User>> => {
  const response = await AXIOS_INSTANCE.put(`/${ApiPrefix.USERS}/mine`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateUserSettings = async ({ token, formData }: UpdateUserSettingsRequest): Promise<BaseResponse<User>> => {
  const response = await AXIOS_INSTANCE.put(`/${ApiPrefix.USERS}/mine/setting`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const changePassword = async ({ formData }: ChangePasswordRequest): Promise<BaseResponse<null>> => {
  const response = await AXIOS_INSTANCE.put(`/${ApiPrefix.USERS}/mine/password`, formData);

  return response.data;
};

// export const forgotPassword = async ({ formData }: ForgotPasswordRequest): Promise<BaseResponse<string>> => {
//   const response = await AXIOS_INSTANCE.post(`/${ApiPrefix.AUTH}/forgot-password`, formData);

//   return response.data;
// };

export const getMyProfile = async ({ token }: GetMyProfileRequest): Promise<BaseResponse<User>> => {
  const response = await AXIOS_INSTANCE.get(`/${ApiPrefix.USERS}/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

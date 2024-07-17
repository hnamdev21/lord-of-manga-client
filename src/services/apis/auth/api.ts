import ApiPrefix from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { BaseResponse } from "@/types/response";

import { SignInRequest, SignOutRequest } from "./dto";

export const signIn = async ({ formData }: SignInRequest): Promise<BaseResponse<string>> => {
  const response = await AXIOS_INSTANCE.post(`/${ApiPrefix.AUTH}/sign-in`, formData);

  return response.data;
};

export const signOut = async ({ formData }: SignOutRequest): Promise<BaseResponse<null>> => {
  const response = await AXIOS_INSTANCE.post(`/${ApiPrefix.AUTH}/sign-out`, formData);

  return response.data;
};

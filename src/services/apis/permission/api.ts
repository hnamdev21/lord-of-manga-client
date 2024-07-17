import Table from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { Permission } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import { GetAllPermissionsRequest } from "./dto";

export const getAllPermissions = async ({ params }: GetAllPermissionsRequest) => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Permission[]>>>(`/${ApiPrefix.PERMISSIONS}`, {
    params,
  });

  return response.data;
};

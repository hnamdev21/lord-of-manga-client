import Table from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { Role } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import { CreateRoleRequest, GetAllRolesRequest, UpdateRoleRequest } from "./dto";

export const getAllRoles = async ({ params }: GetAllRolesRequest) => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Role[]>>>(`/${ApiPrefix.ROLES}`, {
    params,
  });

  return response.data;
};

export const createRole = async ({ token, formData }: CreateRoleRequest) => {
  const response = await AXIOS_INSTANCE.post<BaseResponse<Role>>(`/${ApiPrefix.ROLES}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateRole = async ({ token, id, formData }: UpdateRoleRequest) => {
  const response = await AXIOS_INSTANCE.put<BaseResponse<Role>>(`/${ApiPrefix.ROLES}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

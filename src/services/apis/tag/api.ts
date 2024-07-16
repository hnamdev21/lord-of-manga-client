import Table from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { Tag } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import { CreateTagRequest, DeleteTagRequest, GetAllTagsRequest, UpdateTagRequest } from "./dto";

export const getAllTags = async ({ params }: GetAllTagsRequest): Promise<BaseResponse<BaseGetResponse<Tag[]>>> => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Tag[]>>>(`/${Table.TAGS}`, {
    params,
  });

  return response.data;
};

export const deleteTag = async ({ id, token }: DeleteTagRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.delete<BaseResponse<boolean>>(`/${Table.TAGS}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createTag = async ({ formData, token }: CreateTagRequest): Promise<BaseResponse<Tag>> => {
  const response = await AXIOS_INSTANCE.post<BaseResponse<Tag>>(`/${Table.TAGS}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateTag = async ({ id, formData, token }: UpdateTagRequest): Promise<BaseResponse<Tag>> => {
  const response = await AXIOS_INSTANCE.put<BaseResponse<Tag>>(`/${Table.TAGS}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

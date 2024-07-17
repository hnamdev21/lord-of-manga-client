import Table from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { Chapter } from "@/types/data";
import { BaseResponse } from "@/types/response";

import { CreateChapterRequest, DeleteChapterRequest, RestoreChapterRequest } from "./dto";

export const createChapter = async ({ formData, token }: CreateChapterRequest): Promise<BaseResponse<Chapter>> => {
  const response = await AXIOS_INSTANCE.post<BaseResponse<Chapter>>(`/${ApiPrefix.CHAPTERS}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteChapter = async ({ id, formData, token }: DeleteChapterRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${ApiPrefix.CHAPTERS}/${id}/delete`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const restoreChapter = async ({ id, token }: RestoreChapterRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${ApiPrefix.CHAPTERS}/${id}/restore`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

import Table from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { BaseResponse } from "@/types/response";

import { DeleteChapterRequest, RestoreChapterRequest } from "./dto";

export const deleteChapter = async ({ id, formData, token }: DeleteChapterRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${Table.CHAPTERS}/${id}/delete`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const restoreChapter = async ({ id, token }: RestoreChapterRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${Table.CHAPTERS}/${id}/restore`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

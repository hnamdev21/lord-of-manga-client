import Table from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { Category } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import { CreateCategoryRequest, DeleteCategoryRequest, GetAllCategoriesRequest, UpdateCategoryRequest } from "./dto";

export const getAllCategories = async ({ params }: GetAllCategoriesRequest): Promise<BaseResponse<BaseGetResponse<Category[]>>> => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Category[]>>>(`/${ApiPrefix.CATEGORIES}`, {
    params,
  });

  return response.data;
};

export const deleteCategory = async ({ id, token }: DeleteCategoryRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.delete<BaseResponse<boolean>>(`/${ApiPrefix.CATEGORIES}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createCategory = async ({ formData, token }: CreateCategoryRequest): Promise<BaseResponse<Category>> => {
  const response = await AXIOS_INSTANCE.post<BaseResponse<Category>>(`/${ApiPrefix.CATEGORIES}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateCategory = async ({ id, formData, token }: UpdateCategoryRequest): Promise<BaseResponse<Category>> => {
  const response = await AXIOS_INSTANCE.put<BaseResponse<Category>>(`/${ApiPrefix.CATEGORIES}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

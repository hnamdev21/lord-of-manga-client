import Table from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { Comic } from "@/types/data";
import { GetMyComicBySlugRequest } from "@/types/form";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import {
  CreateComicRequest,
  DeleteComicRequest,
  GetAllComicsBySlugsRequest,
  GetAllComicsRequest,
  GetComicBySlugRequest,
  GetMyComicsRequest,
  RestoreComicRequest,
  UpdateComicRequest,
} from "./dto";

export const deleteComic = async ({ id, formData, token }: DeleteComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${ApiPrefix.COMICS}/${id}/delete`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); // TODO: BACKEND

  return response.data;
};

export const restoreComic = async ({ id, token }: RestoreComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${ApiPrefix.COMICS}/${id}/restore`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); // TODO: BACKEND

  return response.data;
};

export const getAllMyComics = async ({ token, params }: GetMyComicsRequest): Promise<BaseResponse<BaseGetResponse<Comic[]>>> => {
  const response = await AXIOS_INSTANCE.get(`/${ApiPrefix.COMICS}/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
};

export const getMyComicBySlug = async ({ slug, token }: GetMyComicBySlugRequest): Promise<BaseResponse<Comic>> => {
  const response = await AXIOS_INSTANCE.get(`/${ApiPrefix.COMICS}/slug/${slug}/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getComicBySlug = async ({ slug }: GetComicBySlugRequest): Promise<BaseResponse<Comic>> => {
  const response = await AXIOS_INSTANCE.get(`/${ApiPrefix.COMICS}/slug/${slug}`);

  return response.data;
};

export const createComic = async ({ formData, token }: CreateComicRequest): Promise<BaseResponse<Comic>> => {
  const response = await AXIOS_INSTANCE.post(`/${ApiPrefix.COMICS}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateComic = async ({ id, formData, token }: UpdateComicRequest): Promise<BaseResponse<Comic>> => {
  const response = await AXIOS_INSTANCE.put(`/${ApiPrefix.COMICS}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAllComicsBySlugs = async ({ formData }: GetAllComicsBySlugsRequest): Promise<BaseResponse<Comic[]>> => {
  const response = await AXIOS_INSTANCE.post(`/${ApiPrefix.COMICS}/slugs`, formData);

  return response.data;
};

export const getAllComics = async ({ params }: GetAllComicsRequest) => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>(`/${ApiPrefix.COMICS}`, {
    params,
  });

  return response.data;
};

import Table from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { Comic } from "@/types/data";
import { GetMyComicBySlugRequest } from "@/types/form";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import {
  BanComicRequest,
  CreateComicRequest,
  DeleteComicRequest,
  GetComicBySlugRequest,
  GetMyComicsRequest,
  RestoreComicRequest,
  UnbanComicRequest,
  UpdateComicRequest,
} from "./dto";

export const deleteComic = async ({ id, formData, token }: DeleteComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${Table.COMICS}/${id}/delete`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const restoreComic = async ({ id, token }: RestoreComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${Table.COMICS}/${id}/restore`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllMyComics = async ({ token, params }: GetMyComicsRequest): Promise<BaseResponse<BaseGetResponse<Comic[]>>> => {
  const response = await AXIOS_INSTANCE.get(`/${Table.COMICS}/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
};

export const getMyComicBySlug = async ({ slug, token }: GetMyComicBySlugRequest): Promise<BaseResponse<Comic>> => {
  const response = await AXIOS_INSTANCE.get(`/${Table.COMICS}/slug/${slug}/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getComicBySlug = async ({ slug }: GetComicBySlugRequest): Promise<BaseResponse<Comic>> => {
  const response = await AXIOS_INSTANCE.get(`/${Table.COMICS}/slug/${slug}`);

  return response.data;
};

export const banComic = async ({ id, formData, token }: BanComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${Table.COMICS}/${id}/ban`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const unbanComic = async ({ id, token }: UnbanComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/${Table.COMICS}/${id}/unban`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createComic = async ({ formData, token }: CreateComicRequest): Promise<BaseResponse<Comic>> => {
  const response = await AXIOS_INSTANCE.post(`/${Table.COMICS}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateComic = async ({ id, formData, token }: UpdateComicRequest): Promise<BaseResponse<Comic>> => {
  const response = await AXIOS_INSTANCE.put(`/${Table.COMICS}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

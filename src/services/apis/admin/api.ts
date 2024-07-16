import Table from "@/constants/table";
import AXIOS_INSTANCE from "@/services/instance";
import { Chapter, Comic, User } from "@/types/data";
import { BaseGetResponse, BaseResponse } from "@/types/response";

import {
  ApproveChapterRequest,
  ApproveComicRequest,
  BanChapterRequest,
  BanComicRequest,
  BanUserRequest,
  CreateEmployeeRequest,
  DeleteChapterRequest,
  DeleteComicRequest,
  GetAllChaptersByComicSlugRequest,
  GetAllComicsRequest,
  GetAllUsersRequest,
  GetComicBySlug,
  RestoreChapterRequest,
  RestoreComicRequest,
  UnbanChapterRequest,
  UnbanComicRequest,
  UpdateEmployeeRequest,
} from "./dto";

export const getAllUsers = async ({ params, token }: GetAllUsersRequest) => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<User[]>>>(`/admin/${Table.USERS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
};

export const createEmployee = async ({ formData, token }: CreateEmployeeRequest) => {
  const response = await AXIOS_INSTANCE.post<BaseResponse<boolean>>("/admin/users", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateEmployee = async ({ id, formData, token }: UpdateEmployeeRequest) => {
  const response = await AXIOS_INSTANCE.put<BaseResponse<boolean>>(`/admin/users/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const banUser = async ({ id, formData, token }: BanUserRequest) => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.USERS}/${id}/ban`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getComicBySlug = async ({ slug, token }: GetComicBySlug) => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<Comic>>(`/admin/${Table.COMICS}/slug/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const approveComic = async ({ id, token }: ApproveComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.COMICS}/${id}/approve`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const banComic = async ({ id, formData, token }: BanComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.COMICS}/${id}/ban`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const unbanComic = async ({ id, token }: UnbanComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.COMICS}/${id}/unban`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteComic = async ({ id, formData, token }: DeleteComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.COMICS}/${id}/delete`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const restoreComic = async ({ id, token }: RestoreComicRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.COMICS}/${id}/restore`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const approveChapter = async ({ id, token }: ApproveChapterRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.CHAPTERS}/${id}/approve`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const banChapter = async ({ id, formData, token }: BanChapterRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.CHAPTERS}/${id}/ban`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const unbanChapter = async ({ id, token }: UnbanChapterRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.CHAPTERS}/${id}/unban`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteChapter = async ({ id, formData, token }: DeleteChapterRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.CHAPTERS}/${id}/delete`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const restoreChapter = async ({ id, token }: RestoreChapterRequest): Promise<BaseResponse<boolean>> => {
  const response = await AXIOS_INSTANCE.patch<BaseResponse<boolean>>(`/admin/${Table.CHAPTERS}/${id}/restore`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllChaptersByComicSlug = async ({ slug, params, token }: GetAllChaptersByComicSlugRequest) => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Chapter[]>>>(`/admin/${Table.CHAPTERS}/comic/slug/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
};

export const getAllComics = async ({ params, token }: GetAllComicsRequest) => {
  const response = await AXIOS_INSTANCE.get<BaseResponse<BaseGetResponse<Comic[]>>>(`/admin/${Table.COMICS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
};

import { Chapter, Comic, User } from "@/types/data";
import { FormBanChapter, FormBanComic, FormBanUser, FormCreateEmployee, FormDeleteChapter, FormDeleteComic, FormUpdateEmployee } from "@/types/form";

export type GetAllUsersRequest = {
  token: string;
  params: {
    pageNumber?: number;
    size?: number;
  };
};

export type CreateEmployeeRequest = {
  formData: FormCreateEmployee;
  token: string;
};

export type UpdateEmployeeRequest = {
  id: User["id"];
  formData: FormUpdateEmployee;
  token: string;
};

export type BanUserRequest = {
  id: User["id"];
  formData: FormBanUser;
  token: string;
};

export type GetComicBySlug = {
  slug: string;
  token: string;
};

export type ApproveComicRequest = {
  id: Comic["id"];
  token: string;
};

export type BanComicRequest = {
  id: Comic["id"];
  formData: FormBanComic;
  token: string;
};

export type UnbanComicRequest = {
  id: Comic["id"];
  token: string;
};

export type DeleteComicRequest = {
  id: Comic["id"];
  formData: FormDeleteComic;
  token: string;
};

export type RestoreComicRequest = {
  id: Comic["id"];
  token: string;
};

export type ApproveChapterRequest = {
  id: Chapter["id"];
  token: string;
};

export type BanChapterRequest = {
  id: Chapter["id"];
  formData: FormBanChapter;
  token: string;
};

export type UnbanChapterRequest = {
  id: Chapter["id"];
  token: string;
};

export type DeleteChapterRequest = {
  id: Chapter["id"];
  formData: FormDeleteChapter;
  token: string;
};

export type RestoreChapterRequest = {
  id: Chapter["id"];
  token: string;
};

export type GetAllChaptersByComicSlugRequest = {
  slug: string;
  token: string;
  params: {
    pageNumber?: number;
    size?: number;
  };
};

export type GetAllComicsRequest = {
  token: string;
  params: {
    pageNumber?: number;
    size?: number;
  };
};

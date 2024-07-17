import { Comic } from "@/types/data";
import { FormComicFilter, FormCreateComic, FormDeleteComic, FormUpdateComic } from "@/types/form";

export type DeleteComicRequest = {
  id: Comic["id"];
  formData: FormDeleteComic;
  token: string;
};

export type RestoreComicRequest = {
  id: Comic["id"];
  token: string;
};

export type GetMyComicsRequest = {
  token: string;
  params?: {
    pageNumber?: number;
    size?: number;
    all?: boolean;
    status?: Comic["status"];
    type?: Comic["type"];
  };
};

export type GetComicsBySlugsRequest = {
  slugs: string[];
};

export type GetComicBySlugRequest = {
  slug: string;
};

export type CreateComicRequest = {
  formData: FormCreateComic;
  token: string;
};

export type UpdateComicRequest = {
  id: Comic["id"];
  formData: FormUpdateComic;
  token: string;
};

export type GetAllComicsBySlugsRequest = {
  formData: {
    slugs: string[];
  };
};

export type GetAllComicsRequest = {
  params?: FormComicFilter & {
    pageNumber?: number;
    size?: number;
  };
};

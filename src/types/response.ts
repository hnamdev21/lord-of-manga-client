import { Comic } from "./data";

export type BaseResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export type SearchComicResponse = {
  byTitle: Comic[];
  byCategoryName: Comic[];
  byTagName: Comic[];
};

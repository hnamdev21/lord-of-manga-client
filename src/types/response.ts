import { Comic } from "./data";

export type BaseResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export type SearchResponse = {
  byTitle: Comic[];
  byCategoryName: Comic[];
  byTagName: Comic[];
};

type Pageable = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  unpaged: boolean;
};

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type BaseGetResponse<T> = {
  content: T;
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

import { Tag } from "@/types/data";
import { FormCreateTag, FormUpdateTag } from "@/types/form";

export type GetAllTagsRequest = {
  pageNumber?: number;
  size?: number;
};

export type CreateTagRequest = {
  formData: FormCreateTag;
  token: string;
};

export type UpdateTagRequest = {
  id: Tag["id"];
  formData: FormUpdateTag;
  token: string;
};

export type DeleteTagRequest = {
  id: Tag["id"];
  token: string;
};

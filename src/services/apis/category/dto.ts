import { Category } from "@/types/data";
import { FormCreateCategory, FormUpdateCategory } from "@/types/form";

export type GetAllCategoriesRequest = {
  pageNumber?: number;
  size?: number;
};

export type DeleteCategoryRequest = {
  id: Category["id"];
  token: string;
};

export type CreateCategoryRequest = {
  formData: FormCreateCategory;
  token: string;
};

export type UpdateCategoryRequest = {
  id: Category["id"];
  formData: FormUpdateCategory;
  token: string;
};

import { Chapter } from "@/types/data";
import { FormCreateChapter, FormDeleteChapter } from "@/types/form";

export type CreateChapterRequest = {
  token: string;
  formData: FormCreateChapter;
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

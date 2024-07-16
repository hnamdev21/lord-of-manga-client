import { Chapter } from "@/types/data";
import { FormDeleteChapter } from "@/types/form";

export type DeleteChapterRequest = {
  id: Chapter["id"];
  formData: FormDeleteChapter;
  token: string;
};

export type RestoreChapterRequest = {
  id: Chapter["id"];
  token: string;
};

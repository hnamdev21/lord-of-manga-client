export type FormSignIn = {
  username: string;
  password: string;
  remember: boolean;
};

export type FormSignUp = {
  fullName: string;
  username: string;
  password: string;
  email?: string;
  receiveNews: boolean;
};

export type FormUpdateProfile = {
  fullName: string;
  twoFactorAuthentication: boolean;
};

export type FormCreateComment = {
  parentId: string;
  chapterId: string;
  content: string;
};

export type FormUpdateComment = {
  id: string;
  content: string;
};

export type FormCreateTag = {
  name: string;
};

export type FormUpdateTag = FormCreateTag & {
  id: string;
};

export type FormCreateCategory = {
  name: string;
};

export type FormUpdateCategory = FormCreateCategory & {
  id: string;
};

export type FormCreateComic = {
  title: string;
  description: string;
  author: string;
  tags: string[];
  categories: string[];
  type: "FREE" | "PAID_PER_CHAPTER" | "PAID_ONCE";
  price: number;
  showComment: boolean;
};

export type FormUpdateComic = FormCreateComic & {
  id: string;
};

export type FormCreateChapter = {
  comicId: string;
  title: string;
  type: "FREE" | "PAID";
  price: number;
};

export type FormUpdateChapter = FormCreateChapter & {
  id: string;
};

export type FormCreateRole = {
  title: string;
};

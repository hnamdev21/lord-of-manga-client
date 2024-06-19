import { FieldNamesType } from "antd/es/cascader";

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

export type FormChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type FormComicFilter = {
  title: string;
  sortBy: "all" | "createdAt" | "updatedAt" | "title" | "price" | "viewCount" | "searchCount" | "likeCount";
  type: "all" | "FREE" | "PAID_PER_CHAPTER" | "PAID_ONCE";
  from: number;
  to: number;
};

export type FormForgotPassword = {
  email: string;
};

export type FormResetPassword = {
  password: string;
  confirmPassword: string;
  code: string;
};

export type FormTwoFactorAuthentication = {
  code: string;
};

export type FormUpdateProfile = {
  fullName: string;
  twoStepVerification: boolean;
  gender: string;
  receiveNews: boolean;
  email: string;
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
  tagNames: string[];
  categoryNames: string[];
  cover: FieldNamesType[];
  thumbnail: FieldNamesType[];
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
  showComment: boolean;
  type: "FREE" | "PAID";
  price: number;
};

export type FormUpdateChapter = FormCreateChapter & {
  id: string;
};

export type FormCreateRole = {
  title: string;
};

import { FieldNamesType } from "antd/es/cascader";

import { Category, Chapter, Comic, Comment, Permission, Role, Tag, User } from "./data";

export type FormSignIn = Pick<User, "username"> & {
  password: string;
  remember: boolean;
};

export type FormSignUp = Pick<User, "fullName" | "username" | "email" | "receiveNews"> & {
  password: string;
};

export type FormChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type FormVerifyEmail = {
  code: string;
};

export type FormUpdateEmail = Pick<User, "email">;
export type FormUpdateUserSetting = Pick<User, "twoStepVerification" | "receiveNews">;

export type FormGetVerifyCode = Pick<User, "username" | "email">;

export type FormUpdatePassword = {
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

export type FormForgotPassword = Required<Pick<User, "email">>;

export type FormResetPassword = {
  password: string;
  confirmPassword: string;
  code: string;
};

export type FormTwoFactorAuthentication = {
  code: string;
};

export type FormUpdateProfile = Pick<User, "fullName" | "twoStepVerification" | "gender" | "receiveNews">;

export type FormCreateComment = Pick<Comment, "parentComment" | "chapter" | "content">;
export type FormUpdateComment = Pick<Comment, "id" | "content">;

export type FormCreateTag = Pick<Tag, "name">;
export type FormUpdateTag = FormCreateTag & Pick<Tag, "id">;

export type FormCreateCategory = Pick<Category, "name">;
export type FormUpdateCategory = FormCreateCategory & Pick<Category, "id">;

export type FormCreateComic = Pick<Comic, "title" | "description" | "author" | "type" | "price"> & {
  tagNames: string[];
  categoryNames: string[];
  cover: FieldNamesType[];
  thumbnail: FieldNamesType[];
};
export type FormUpdateComic = FormCreateComic & Pick<Comic, "id">;

export type FormBanComic = Pick<Comic, "bannedReason">;
export type FormDeleteComic = Pick<Comic, "deletedReason">;

export type FormBanChapter = Pick<Chapter, "bannedReason">;
export type FormDeleteChapter = Pick<Chapter, "deletedReason">;

export type FormCreateChapter = Pick<Chapter, "title" | "showComment" | "type" | "price"> & {
  comicId: Comic["id"];
};
export type FormUpdateChapter = FormCreateChapter & Pick<Chapter, "id">;

export type FormCreateRole = Pick<Role, "name" | "description"> & {
  permissionIds: Permission["id"][];
};
export type FormUpdateRole = FormCreateRole & Pick<Role, "id">;

export type FormCreateEmployee = Pick<User, "fullName" | "username" | "email" | "gender"> & {
  roleIds: Role["id"][];
};
export type FormUpdateEmployee = FormCreateEmployee & Pick<User, "id">;

export type ApproveComicRequest = {
  id: Comic["id"];
  token: string;
};

export type GetMyComicBySlugRequest = {
  slug: string;
  token: string;
};

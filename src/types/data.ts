import { DefaultPermissionValue } from "@/constants/default-data";

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;
export type Gender = keyof typeof Gender;

export const ComicStatus = {
  PENDING: "PENDING",
  BANNED: "BANNED",
  APPROVED: "APPROVED",
  DELETED: "DELETED",
} as const;
export type ComicStatus = keyof typeof ComicStatus;

export const ChapterStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  BANNED: "BANNED",
  DELETED: "DELETED",
} as const;
export type ChapterStatus = keyof typeof ChapterStatus;

export const ComicType = {
  FREE: "FREE",
  PAID_ONCE: "PAID_ONCE",
  PAID_PER_CHAPTER: "PAID_PER_CHAPTER",
} as const;
export type ComicType = keyof typeof ComicType;

export const ChapterType = {
  FREE: "FREE",
  PAID: "PAID",
} as const;
export type ChapterType = keyof typeof ChapterType;

export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type Permission = BaseEntity & {
  name: string;
  value: DefaultPermissionValue;
  description: string;
};

export type Role = BaseEntity & {
  name: string;
  value: string;
  description: string;
  permissions: Permission[];
  defaultValue: boolean;
};

export type User = BaseEntity & {
  fullName: string;
  username: string;
  gender: Gender;
  email?: string;
  avatarPath?: string;
  roles: Role[];
  twoStepVerification: boolean;
  receiveNews: boolean;
  bannedReason: string | null;
  bannedAt: string | null;
  verifiedUser: boolean;
  bannedUser: boolean;
};

export type Tag = BaseEntity & {
  name: string;
  slug: string;
};

export type Category = BaseEntity & {
  name: string;
  slug: string;
};

export type Comment = BaseEntity & {
  commenter: User;
  parentComment: Comment | null;
  chapter: Chapter;
  content: string;
  isDisabled: boolean;
  disabledReason: string;
  comments: Comment[];
};

export type Chapter = BaseEntity & {
  title: string;
  slug: string;
  ordinal: number;
  totalPages: number;
  type: ChapterType;
  price: number;
  viewCount: number;
  status: ChapterStatus;
  showComment: boolean;
  comments: Comment[];
  banner: User | null;
  bannedReason: string | null;
  bannedAt: string | null;
  deleter: User | null;
  deletedAt: string | null;
  deletedReason: string | null;
};

export type Comic = BaseEntity & {
  title: string;
  description: string;
  author: string;
  type: ComicType;
  price: number;
  viewCount: number;
  searchCount: number;
  slug: string;
  coverPath: string;
  thumbnailPath: string;
  creator: User;
  tags: Tag[];
  categories: Category[];
  status: ComicStatus;
  banner: User | null;
  bannedReason: string | null;
  bannedAt: string | null;
  deleter: User | null;
  deletedAt: string | null;
  deletedReason: string | null;
  chapters: Chapter[];
};

export const isUserHavePermission = (user: User, permissionValue: DefaultPermissionValue) => {
  return user.roles.some((role) => role.permissions.some((permission) => permission.value === permissionValue));
};

export const isUserHaveRole = (user: User, roleValue: string) => {
  return user.roles.some((role) => role.value === roleValue);
};

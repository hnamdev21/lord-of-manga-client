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

export const PermissionValue = {
  CREATE_COMIC: "CREATE_COMIC",
  USER_MANAGER: "USER_MANAGER",
  APPROVE_COMIC: "APPROVE_COMIC",
  APPROVE_CHAPTER: "APPROVE_CHAPTER",
  BAN_COMIC: "BAN_COMIC",
  BAN_CHAPTER: "BAN_CHAPTER",
  DELETE_COMIC: "DELETE_COMIC",
  DELETE_CHAPTER: "DELETE_CHAPTER",
  COMMENT: "COMMENT",
  PREVIEW_COMIC: "PREVIEW_COMIC",
  READ_COMIC: "READ_COMIC",
  DISABLE_COMMENT: "DISABLE_COMMENT",
  APPROVE_REPORT: "APPROVE_REPORT",
  REJECT_REPORT: "REJECT_REPORT",
} as const;
export type PermissionValue = keyof typeof PermissionValue;

export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type Permission = BaseEntity & {
  name: string;
  value: PermissionValue;
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

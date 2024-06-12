type ComicStatus = "PENDING" | "APPROVED" | "BANNED" | "DELETED";
type ChapterStatus = "PENDING" | "APPROVED" | "BANNED" | "DELETED";

export type BaseEntity = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type Permission = BaseEntity & {
  name: string;
  description: string;
};

export type Role = BaseEntity & {
  name: string;
  description: string;
  permissions: Permission[];
};

export type User = BaseEntity & {
  fullName: string;
  username: string;
  email?: string;
  avatarPath?: string;
  roles: Role[];
  twoStepVerification: boolean; // TODO: Rename to twoFactorAuthentication
  receiveNews: boolean;
  bannedReason: string | null;
  bannedAt: string | null;
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
  chapterId: string;
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
  status: ChapterStatus;
  showComment: boolean;
  comments: Comment[];
  banner: User | null;
  bannedReason: string | null;
  bannedAt: string | null;
};

export type Comic = BaseEntity & {
  title: string;
  description: string;
  creator: User;
  tags: Tag[];
  categories: Category[];
  status: ComicStatus;
  banner: User | null;
  bannedReason: string | null;
  bannedAt: string | null;
  chapters: Chapter[];
};

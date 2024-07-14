import { ChapterStatus, ChapterType, ComicStatus, ComicType, Gender } from "@/types/data";

export const ComicTypeMapping: Record<ComicType, string> = {
  [ComicType.FREE]: "Free",
  [ComicType.PAID_PER_CHAPTER]: "Paid per chapter",
  [ComicType.PAID_ONCE]: "Paid once",
} as const;

export const ComicStatusMapping: Record<ComicStatus, string> = {
  [ComicStatus.PENDING]: "Pending",
  [ComicStatus.BANNED]: "Banned",
  [ComicStatus.APPROVED]: "Approved",
  [ComicStatus.DELETED]: "Deleted",
} as const;

export const ChapterTypeMapping: Record<ChapterType, string> = {
  [ChapterType.FREE]: "Free",
  [ChapterType.PAID]: "Paid",
} as const;

export const ChapterStatusMapping: Record<ChapterStatus, string> = {
  [ChapterStatus.PENDING]: "Pending",
  [ChapterStatus.BANNED]: "Banned",
  [ChapterStatus.APPROVED]: "Approved",
  [ChapterStatus.DELETED]: "Deleted",
} as const;

export const GenderMapping: Record<Gender, string> = {
  [Gender.MALE]: "Male",
  [Gender.FEMALE]: "Female",
  [Gender.OTHER]: "Other",
} as const;

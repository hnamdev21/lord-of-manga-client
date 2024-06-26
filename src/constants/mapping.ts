import { ComicStatus, ComicType } from "@/types/data";

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

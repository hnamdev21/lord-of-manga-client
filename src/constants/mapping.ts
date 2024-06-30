import { ComicStatus, ComicType, PermissionName } from "@/types/data";

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

export const PermissionNameMapping = {
  [PermissionName.CREATE_COMIC]: "Create comic",
  [PermissionName.BAN_COMIC]: "Ban comic",
  [PermissionName.USER_MANAGEMENT]: "User management",
  [PermissionName.APPROVE_CHAPTER]: "Approve chapter",
  [PermissionName.APPROVE_COMIC]: "Approve comic",
  [PermissionName.COMMENT]: "Comment",
  [PermissionName.BAN_CHAPTER]: "Ban chapter",
  [PermissionName.PREVIEW_COMIC]: "Preview comic",
  [PermissionName.READ_COMIC]: "Read comic",
  [PermissionName.DISABLE_COMMENT]: "Disable comment",
} as const;

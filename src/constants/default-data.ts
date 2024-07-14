export const DefaultRoleValue = {
  ADMIN: "ADMIN",
  USER: "USER",
  READER: "READER",
  COMIC_CENSOR: "COMIC_CENSOR",
  COMMENT_CENSOR: "COMMENT_CENSOR",
  CREATOR: "CREATOR",
  HUMAN_RESOURCE: "HUMAN_RESOURCE",
  REPORT_CENSOR: "REPORT_CENSOR",
  EMPLOYEE: "EMPLOYEE",
} as const;
export type DefaultRoleValue = keyof typeof DefaultRoleValue;
export const DefaultRoleValues: string[] = Object.values(DefaultRoleValue);

export const DefaultPermissionValue = {
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
export type DefaultPermissionValue = keyof typeof DefaultPermissionValue;
export const DefaultPermissionValues: string[] = Object.values(DefaultPermissionValue);

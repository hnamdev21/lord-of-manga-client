export const DefaultRoleValue = {
  ADMIN: "ADMIN",
  USER: "USER",
  READER: "READER",
  COMIC_CENSOR: "COMIC_CENSOR",
  COMMENT_CENSOR: "COMMENT_CENSOR",
  CREATOR: "CREATOR",
  HUMAN_RESOURCE: "HUMAN_RESOURCE",
  REPORT_CENSOR: "REPORT_CENSOR",
} as const;
export const DefaultRoleValues: string[] = Object.values(DefaultRoleValue);

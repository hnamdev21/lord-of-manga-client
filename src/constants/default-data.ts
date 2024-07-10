export const DefaultRoleName = {
  ADMIN: "ADMIN",
  USER: "USER",
  ANONYMOUS: "ANONYMOUS",
} as const;
export const DefaultRoleNames: string[] = Object.values(DefaultRoleName);

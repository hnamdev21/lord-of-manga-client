const Path = {
  USER: {
    HOME: "/",
    PROFILE: "/profile",
    COMICS: "/comics",
    COMIC_MANAGEMENT: "/comic-management",
    RECYCLE_BIN: "/recycle-bin",
    READING_HISTORY: "/reading-history",
    SAVED_COMICS: "/saved-comics",
    UPLOAD: "/upload",
  } as const,
  AUTH: {
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  } as const,
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    ROLES: "/admin/roles",
    USERS: "/admin/users",
    COMICS: "/admin/comics",
    CATEGORIES: "/admin/categories",
    TAGS: "/admin/tags",
    COMMENTS: "/admin/comments",
    CHAPTERS: "/admin/chapters",
    BANNED_USERS: "/admin/banned-users",
    BANNED_COMICS: "/admin/banned-comics",
    RECYCLE_BIN: "/admin/recycle-bin",
    PAYMENTS: "/admin/payments",
  } as const,
  ERROR: {
    NOT_FOUND: "/404",
    FORBIDDEN: "/403",
    INTERNAL_SERVER_ERROR: "/500",
  } as const,
} as const;

export type Path = (typeof Path)[keyof typeof Path];

export const authorizedUserPaths = [Path.USER.PROFILE, Path.USER.UPLOAD, Path.USER.COMIC_MANAGEMENT, Path.USER.RECYCLE_BIN, Path.USER.SAVED_COMICS];
export const adminPaths = [
  "/admin",
  Path.ADMIN.DASHBOARD,
  Path.ADMIN.USERS,
  Path.ADMIN.COMICS,
  Path.ADMIN.CATEGORIES,
  Path.ADMIN.TAGS,
  Path.ADMIN.COMMENTS,
  Path.ADMIN.CHAPTERS,
];

export default Path;

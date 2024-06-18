const Path = {
  USER: {
    HOME: "/",
    PROFILE: "/profile",
    COMICS: "/comics",
  } as const,
  AUTH: {
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  } as const,
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    COMICS: "/admin/comics",
    CATEGORIES: "/admin/categories",
    TAGS: "/admin/tags",
    COMMENTS: "/admin/comments",
    CHAPTERS: "/admin/chapters",
  } as const,
  ERROR: {
    NOT_FOUND: "/404",
    FORBIDDEN: "/403",
    INTERNAL_SERVER_ERROR: "/500",
  } as const,
} as const;

export type Path = (typeof Path)[keyof typeof Path];

export default Path;

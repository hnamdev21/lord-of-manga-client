const Table = {
  USERS: "users",
  ROLES: "roles",
  PERMISSIONS: "permissions",
  TAGS: "tags",
  CATEGORIES: "categories",
  COMICS: "comics",
  CHAPTERS: "chapters",
  LOVED_COMICS: "loved-comics",
  COMMENTS: "comments",
  USER_PAYMENTS: "user-payments",
  // FOLLOWERS: "followers",
  // REPORTS: "reports",
} as const;

export type Table = (typeof Table)[keyof typeof Table];

export default Table;

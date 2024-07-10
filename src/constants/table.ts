const Table = {
  USERS: "users",
  TAGS: "tags",
  CATEGORIES: "categories",
  COMICS: "comics",
  CHAPTERS: "chapters",
  LOVED_COMICS: "loved_comics",
  COMMENTS: "comments",
  USER_PAYMENTS: "user_payments",
  // FOLLOWERS: "followers",
  // REPORTS: "reports",
} as const;

export type Table = (typeof Table)[keyof typeof Table];

export default Table;

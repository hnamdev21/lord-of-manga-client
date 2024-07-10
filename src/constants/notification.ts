const Notification = {
  WELCOME: "Welcome to Lord of Manga!",

  // Authorization
  UNAUTHORIZED: "Unauthorized",
  SIGN_IN_REQUIRED: "Please sign in to continue",
  SIGN_IN_AS_ADMIN_REQUIRED: "Please sign in as an admin to continue",
  INCORRECT_USERNAME_OR_PASSWORD: "Incorrect username or password",
  BANNED: "You are banned from the system",

  // Input
  PLEASE_ENTER: (field: string) => `Please enter ${field}`,
  PLEASE_SELECT: (field: string) => `Please select ${field}`,
  PLEASE_UPLOAD: (field: string) => `Please upload ${field}`,
  PLEASE_ADD: (field: string) => `Please add ${field}`,

  DUPLICATE: (field: string) => `${field} already exists`,
  INVALID: (field: string) => `Invalid ${field}`,

  // Success
  SUCCESS_CREATED: (field: string) => `${field} created successfully`,
  SUCCESS_UPDATED: (field: string) => `${field} updated successfully`,
  SUCCESS_DELETED: (field: string) => `${field} deleted successfully`,
  SUCCESS_UPLOADED: (field: string) => `${field} uploaded successfully`,
  SUCCESS_ADDED: (field: string) => `${field} added successfully`,
  SUCCESS_REMOVED: (field: string) => `${field} removed successfully`,
  SUCCESS_RESTORED: (field: string) => `${field} restored successfully`,
  SUCCESS_APPROVED: (field: string) => `${field} approved successfully`,
  SUCCESS_VERIFIED: (field: string) => `${field} verified successfully`,
  SUCCESS_BAN: (field: string) => `${field} banned successfully`,

  // Error
  SOMETHING_WENT_WRONG: "Something went wrong",
  PLEASE_TRY_AGAIN: "Please try again",
  FAILED_TO_CREATE: (field: string) => `Failed to create ${field}`,
  FAILED_TO_UPDATE: (field: string) => `Failed to update ${field}`,
  FAILED_TO_DELETE: (field: string) => `Failed to delete ${field}`,
  FAILED_TO_UPLOAD: (field: string) => `Failed to upload ${field}`,
  FAILED_TO_ADD: (field: string) => `Failed to add ${field}`,
  FAILED_TO_REMOVE: (field: string) => `Failed to remove ${field}`,
  FAILED_TO_RESTORE: (field: string) => `Failed to restore ${field}`,
  FAILED_TO_APPROVE: (field: string) => `Failed to approve ${field}`,
  NOT_FOUND: (field: string) => `${field} not found`,
};

export default Notification;

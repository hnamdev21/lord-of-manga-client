const Notification = {
  welcome: "Welcome to Lord of Manga!",

  // Authorization
  unauthorized: "Unauthorized",
  signInRequired: "Please sign in to continue",
  signInAsAdminRequired: "Please sign in as an admin to continue",
  wrongCredentials: "Incorrect username or password",
  banned: "You are banned from the system",

  // Input
  pleaseEnter: (field: string) => `Please enter ${field}`,
  pleaseSelect: (field: string) => `Please select ${field}`,
  pleaseUpload: (field: string) => `Please upload ${field}`,
  pleaseAdd: (field: string) => `Please add ${field}`,

  duplicate: (field: string) => `${field} already exists`,
  invalid: (field: string) => `Invalid ${field}`,

  // Success
  createSuccess: (field: string) => `${field} created successfully`,
  updateSuccess: (field: string) => `${field} updated successfully`,
  deleteSuccess: (field: string) => `${field} has been deleted`,
  uploadSuccess: (field: string) => `${field} uploaded successfully`,
  addSuccess: (field: string) => `${field} added successfully`,
  removeSuccess: (field: string) => `${field} has been removed`,
  restoreSuccess: (field: string) => `${field} restored successfully`,
  approveSuccess: (field: string) => `${field} approved successfully`,
  successVerified: (field: string) => `${field} verified successfully`,
  banSuccess: (field: string) => `${field} has been banned`,

  // Error
  unexpectedError: "Something went wrong",
  tryAgain: "Please try again",
  failToCreate: (field: string) => `Failed to create ${field}`,
  failToUpdate: (field: string) => `Failed to update ${field}`,
  failToDelete: (field: string) => `Failed to delete ${field}`,
  failToUpload: (field: string) => `Failed to upload ${field}`,
  failToAdd: (field: string) => `Failed to add ${field}`,
  failToRemove: (field: string) => `Failed to remove ${field}`,
  failedToRestore: (field: string) => `Failed to restore ${field}`,
  failToApprove: (field: string) => `Failed to approve ${field}`,
  notFound: (field: string) => `${field} not found`,
};

export default Notification;

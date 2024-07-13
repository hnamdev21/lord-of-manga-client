export const environment = process.env.NEXT_PUBLIC_APP_ENV || "development";
export const isDevelopment = environment === "development";
export const localApiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://localhost:1337";
export const localApiUrlNoProtocol = localApiUrl.replace(/(^\w+:|^)\/\//, "");
export const localApiUrlNoProtocolNoPort = localApiUrlNoProtocol.replace(/:\d+$/, "");
export const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET || "jwtSecret";

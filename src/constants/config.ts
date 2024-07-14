export const environment = process.env.NEXT_PUBLIC_APP_ENV || "development";
export const isDevelopment = environment === "development";
export const apiUrl = (isDevelopment ? process.env.NEXT_PUBLIC_LOCAL_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL) || "http://localhost:1337";
export const apiUrlNoProtocol = apiUrl.replace(/(^\w+:|^)\/\//, "");
export const apiUrlNoProtocolNoPort = apiUrlNoProtocol.replace(/:\d+$/, "");
export const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET || "jwtSecret";

import { message } from "antd";
import axios from "axios";

import Path from "@/constants/path";
import StatusCode from "@/constants/status-code";

const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Origin": "*",
    // accept: "/*",
  },
  // withCredentials: true,
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      message.error(error.response.data.message);
    }
    if (error.response?.status == StatusCode.UNAUTHORIZED && !(window.location.pathname == "/")) {
      window.location.href = Path.AUTH.SIGN_IN;
    }

    if (error.response?.status == StatusCode.FORBIDDEN && !(window.location.pathname == "/")) {
      window.location.href = Path.ERROR.FORBIDDEN;
    }

    return Promise.reject(error);
  }
);

export default AXIOS_INSTANCE;

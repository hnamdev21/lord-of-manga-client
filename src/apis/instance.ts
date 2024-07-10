import { message } from "antd";
import axios from "axios";

import { isDevelopment, localApiUrl } from "@/constants/config";
import Path from "@/constants/path";
import StatusCode from "@/constants/status-code";

const AXIOS_INSTANCE = axios.create({
  baseURL: isDevelopment ? localApiUrl : "",
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
  withCredentials: true,
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && isDevelopment) {
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

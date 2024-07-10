"use client";

import { isDevelopment } from "@/constants/config";

const usePreventImageFromCapturedByUsingExtension = () => {
  if (isDevelopment) return;
};

export default usePreventImageFromCapturedByUsingExtension;

"use client";

const usePreventImageFromCapturedByUsingExtension = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === "development") return;
};

export default usePreventImageFromCapturedByUsingExtension;

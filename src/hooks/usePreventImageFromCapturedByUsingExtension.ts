"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { isDevelopment } from "@/constants/config";
import Path from "@/constants/path";

const usePreventImageFromCapturedByUsingExtension = () => {
  if (isDevelopment) return;

  const router = useRouter();

  const timeoutRef = React.useRef<number | null>(null);

  const checkBodyElementIsStyled = () => {
    timeoutRef.current = window.setTimeout(() => {
      const body = document.querySelector("body");

      if (body?.style.minHeight === "100vh") {
        return router.push(Path.USER.HOME);
      }
    }, 200);
  };

  React.useEffect(() => {
    checkBodyElementIsStyled();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
};

export default usePreventImageFromCapturedByUsingExtension;

"use client";

import React from "react";

import { isDevelopment } from "@/constants/config";

const usePreventImageFromCapturedByUsingKeyboard = () => {
  if (isDevelopment) return;

  const isSavePageShortcut = (event: KeyboardEvent) => (event.ctrlKey && event.key === "s") || (event.metaKey && event.key === "s");
  const isPrintPageShortcut = (event: KeyboardEvent) => (event.ctrlKey && event.key === "p") || (event.metaKey && event.key === "p");
  const isCaptureScreenshotShortcut = (event: KeyboardEvent) =>
    (event.ctrlKey && event.shiftKey && event.key === "s") || (event.metaKey && event.shiftKey && event.key === "s");

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isSavePageShortcut(event) || isPrintPageShortcut(event) || isCaptureScreenshotShortcut(event)) {
      event.preventDefault();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default usePreventImageFromCapturedByUsingKeyboard;

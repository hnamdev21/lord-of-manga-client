"use client";

import React from "react";

const VALID_URLS = ["http://localhost:3000", "/_next/image?url", "https://theguild.sgp1.digitaloceanspaces.com", "data:", "/images"];

const usePreventImageFromAttackedByUsingDevTools = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === "development") return;

  const animateFrame = React.useRef<number | null>(null);

  const isDevToolsShortcut = (event: KeyboardEvent) =>
    (event.metaKey && event.key === "t") ||
    (event.ctrlKey && event.shiftKey && event.key === "I") ||
    (event.ctrlKey && event.shiftKey && event.key === "C") ||
    (event.ctrlKey && event.key === "u") ||
    event.key === "F12" ||
    event.altKey ||
    (event.metaKey && event.shiftKey);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isDevToolsShortcut(event)) {
      event.preventDefault();
    }
  };

  const validateImage = () => {
    animateFrame.current = requestAnimationFrame(validateImage);

    const images = document.querySelectorAll("img");
    const canvases = document.querySelectorAll("canvas");

    images.forEach((image) => {
      const isNoSrc = !image.src;
      const isEmptySrc = image.src === "";
      const isBlobSrc = image.src.startsWith("blob:");
      const isNotInValidUrls = !VALID_URLS.some((url) => image.src.startsWith(url));

      if (isNoSrc || isEmptySrc || isBlobSrc || isNotInValidUrls) image.remove();
    });

    canvases.forEach((c) => c.remove());
  };

  React.useEffect(() => {
    animateFrame.current = requestAnimationFrame(validateImage);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animateFrame.current) cancelAnimationFrame(animateFrame.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default usePreventImageFromAttackedByUsingDevTools;

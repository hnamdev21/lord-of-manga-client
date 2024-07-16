"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import React from "react";

import { isDevelopment } from "@/constants/config";

const usePreventMaskFromStyledUsingDevTools = () => {
  if (isDevelopment) return;

  const router = useRouter();
  const windowSize = useWindowSize();

  const timeoutRef = React.useRef<number | null>(null);

  const checkMaskElementIsStyled = () => {
    timeoutRef.current = window.setTimeout(() => {
      const mask = document.getElementById("big-mask");

      if (
        !mask ||
        mask.style.display === "none" ||
        mask.getBoundingClientRect().width < (windowSize.width || 1920) ||
        mask.getBoundingClientRect().height < (windowSize.height || 1080)
      ) {
        return router.push("/");
      }
    }, 200);
  };

  React.useEffect(() => {
    checkMaskElementIsStyled();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
};

export default usePreventMaskFromStyledUsingDevTools;

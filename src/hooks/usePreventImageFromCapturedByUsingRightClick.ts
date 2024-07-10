"use client";

import React from "react";

import { isDevelopment } from "@/constants/config";

const usePreventImageFromCapturedByUsingRightClick = () => {
  if (isDevelopment) return;

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    const domNeedingPreventRightClick = document.querySelectorAll("img");

    domNeedingPreventRightClick.forEach((dom) => {
      dom.addEventListener("contextmenu", handleContextMenu);
    });

    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      domNeedingPreventRightClick.forEach((dom) => {
        dom.removeEventListener("contextmenu", handleContextMenu);
      });
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
};

export default usePreventImageFromCapturedByUsingRightClick;

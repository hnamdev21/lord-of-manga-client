"use client";

import React from "react";

const usePreventImageFromCapturedByUsingRightClick = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === "development") return;

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

"use client";

import React from "react";

const usePreventImageFromCapturedByUsingThirdParty = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === "development") return;

  const handleUserLeavePage = (_: BeforeUnloadEvent) => {
    if (document.visibilityState === "hidden") {
      // Do something
    }
  };

  const trackMouse = (event: MouseEvent) => {
    if (event.relatedTarget === null) {
      // Mouse is outside the page
    } else {
      // Mouse is inside the page
    }
  };

  React.useEffect(() => {
    window.addEventListener("beforeunload", handleUserLeavePage);
    window.addEventListener("visibilitychange", handleUserLeavePage);

    window.addEventListener("mouseout", trackMouse);
    window.addEventListener("mouseover", trackMouse);

    return () => {
      window.removeEventListener("beforeunload", handleUserLeavePage);
      window.removeEventListener("visibilitychange", handleUserLeavePage);

      window.removeEventListener("mouseout", trackMouse);
      window.removeEventListener("mouseover", trackMouse);
    };
  }, []);
};

export default usePreventImageFromCapturedByUsingThirdParty;

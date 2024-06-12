import cn from "classnames";
import React from "react";

const Container = ({ noGrid = false, children, className = "" }: { noGrid?: boolean; children: React.ReactNode; className?: string }) => {
  return <section className={cn("w-full px-[16rem] mx-auto", !noGrid && "grid grid-cols-12 gap-[2rem]", className)}>{children}</section>;
};

export default Container;

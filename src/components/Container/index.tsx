import cn from "classnames";
import React from "react";

type ContainerProps = {
  noGrid?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

const Container = ({ noGrid = false, children, className = "", ...props }: ContainerProps) => {
  return (
    <section {...props} className={cn("w-full px-[16rem] mx-auto", !noGrid && "grid grid-cols-12 gap-[2rem]", className)}>
      {children}
    </section>
  );
};

export default Container;

import cn from "classnames";
import React from "react";

type Props = {
  noGrid?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Container = ({ noGrid = false, children, className = "", ...props }: Props) => {
  return (
    <section {...props} className={cn("w-full px-[16rem] mx-auto", !noGrid && "grid grid-cols-12 gap-[2rem]", className)}>
      {children}
    </section>
  );
};

export default Container;

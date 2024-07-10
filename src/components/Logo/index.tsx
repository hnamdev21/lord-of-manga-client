import Link from "next/link";
import React from "react";
import { FaWolfPackBattalion } from "react-icons/fa";

import Path from "@/constants/path";

const Logo = () => {
  return (
    <Link href={Path.USER.HOME} className="h-full aspect-square w-auto hover:text-red-500 transition ease-in-out duration-300">
      <FaWolfPackBattalion className="h-full aspect-square w-auto" />
    </Link>
  );
};

export default Logo;

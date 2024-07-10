import Link from "next/link";
import React from "react";

import Typography from "@/components/Typography";
import { FastAccessColProps } from "@/types/component";

import ListData from "./ListData";

const FastAccessCol = ({ title, ...props }: FastAccessColProps) => {
  return (
    <div>
      <Typography tag="h6" fontSize="sm" fontWeight="bold" className="mb-[.5rem]">
        {title}
      </Typography>

      <ul className="flex flex-col">
        {!props.fetch ? (
          (props.data || []).slice(0, 5).map(({ label, href }) => (
            <li key={label}>
              <Link href={href}>
                <Typography tag="span" fontSize="sm">
                  {label}
                </Typography>
              </Link>
            </li>
          ))
        ) : (
          <ListData {...props} />
        )}
      </ul>
    </div>
  );
};

export default FastAccessCol;

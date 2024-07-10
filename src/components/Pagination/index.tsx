"use client";

import cn from "classnames";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import usePagination, { DOTS } from "@/hooks/usePagination";

type PaginationProps = {
  onPageChange: (page: number | string) => void;
  totalPages: number;
  siblingCount?: number;
  currentPage: number;
  pageSize?: number;
};

const Pagination = ({ ...props }: PaginationProps) => {
  const { onPageChange, currentPage } = props;
  const paginationRange = usePagination(props);

  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="flex gap-[1rem] list-none">
      <li
        className={cn("rounded-md aspect-square w-[4rem] border-[.1rem] border-solid border-gray-600 flex items-center justify-center cursor-pointer", {
          "cursor-not-allowed": currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <FaChevronLeft />
      </li>

      {paginationRange.map((pageNumber: number | string) => {
        if (pageNumber === DOTS) {
          return <li className="rounded-md aspect-square w-[4rem] flex items-center justify-center cursor-pointer">&#8230;</li>;
        }

        return (
          <li
            key={pageNumber}
            className={twMerge(
              "rounded-md aspect-square w-[4rem] border-[.1rem] border-solid border-gray-600 flex items-center justify-center cursor-pointer",
              pageNumber === currentPage && "border-gray-100"
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={cn("rounded-md aspect-square w-[4rem] border-[.1rem] border-solid border-gray-600 flex items-center justify-center cursor-pointer", {
          "cursor-not-allowed": currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <FaChevronRight />
      </li>
    </ul>
  );
};

export default Pagination;

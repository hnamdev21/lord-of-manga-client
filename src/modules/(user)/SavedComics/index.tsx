"use client";

import { Divider } from "antd";
import React from "react";

import CardComic from "@/components/CardComic";
import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import Typography from "@/components/Typography";

const SavedComicsModule = () => {
  return (
    <Container noGrid>
      <Typography tag="h1" fontSize="2xl" align="center">
        Saved Comics
      </Typography>

      <Divider />

      <div className="grid grid-cols-12 gap-[2rem] mb-[2rem]">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="col-span-2">
            <CardComic />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <Pagination
          currentPage={1}
          onPageChange={() => {
            //
          }}
          totalPages={10}
          pageSize={12}
          siblingCount={2}
        />
      </div>
    </Container>
  );
};

export default SavedComicsModule;

"use client";

import React from "react";

import Container from "@/components/Container";
import Path from "@/constants/path";
import { FastAccessColProps } from "@/types/component";

import FastAccessCol from "./FastAccessCol";

const fastAccessColumns: Array<FastAccessColProps> = [
  {
    fetch: true,
    title: "Categories",
    fetchUrl: "/categories?size=5",
    prefix: "/comics?categoryName=",
  },
  {
    fetch: true,
    title: "Tags",
    fetchUrl: "/tags?size=5",
    prefix: "/comics?tagName=",
  },
  {
    fetch: false,
    title: "Fast Access",
    data: [
      {
        label: "Home",
        href: Path.USER.HOME,
      },
      {
        label: "Comics",
        href: Path.USER.COMICS,
      },
    ],
  },
] as const;

const Footer = () => {
  return (
    <footer>
      <Container className="py-[2rem] bg-[var(--color-gray-2)]">
        {fastAccessColumns.map((props, index) => (
          <div key={index} className="col-span-2">
            <FastAccessCol {...props} />
          </div>
        ))}

        <div className="col-span-6"></div>
      </Container>
    </footer>
  );
};

export default Footer;

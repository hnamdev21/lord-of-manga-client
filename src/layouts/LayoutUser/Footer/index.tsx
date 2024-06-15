import React from "react";

import Container from "@/components/Container";
import { FastAccessColProps } from "@/types/component";

import FastAccessCol from "./FastAccessCol";

const MOCK: Array<FastAccessColProps> = [
  {
    fetch: false,
    title: "Categories",
    data: [
      {
        label: "Category 1",
        href: "#",
      },
      {
        label: "Category 2",
        href: "#",
      },
      {
        label: "Category 3",
        href: "#",
      },
    ],
  },
  {
    fetch: false,
    title: "Tags",
    data: [
      {
        label: "Tag 1",
        href: "#",
      },
      {
        label: "Tag 2",
        href: "#",
      },
      {
        label: "Tag 3",
        href: "#",
      },
    ],
  },
  {
    fetch: false,
    title: "Fast Access",
    data: [
      {
        label: "Home",
        href: "#",
      },
      {
        label: "About",
        href: "#",
      },
      {
        label: "Contact",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-[4rem]">
      <Container className="py-[2rem] bg-[var(--color-dark)]">
        {MOCK.map((props, index) => (
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

"use client";

import { Popover } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaBookmark, FaDollarSign } from "react-icons/fa";

import { Comic } from "@/types/data";

import Button from "../Button";
import Typography from "../Typography";
import CardComicDetail from "./CardComicDetail";
import styles from "./styles.module.scss";

type CardComicProps = Comic;

const CardComic = ({ ...props }: CardComicProps) => {
  const router = useRouter();
  const { coverPath, title, slug, type } = props;

  return (
    <Popover content={<CardComicDetail {...props} />} placement="left">
      <div className={styles.card} onClick={() => router.push("/comics/" + slug)}>
        <Button className={styles.card__bookmark} element="button" type="button" variant="plain" size="sm">
          <FaBookmark />
        </Button>

        <div className={styles.card__tag}>
          {type === "FREE" ? (
            <Typography tag="span" fontWeight="bold" textColor="light">
              FREE
            </Typography>
          ) : (
            <Typography tag="span" fontWeight="bold" textColor="light">
              <FaDollarSign />
            </Typography>
          )}
        </div>

        <div className={styles.card__coverContainer}>
          <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + coverPath} alt={`Cover image of ${title}`} layout="fill" />
        </div>

        <div className={styles.card__title}>
          <Typography tag="h6" className="line-clamp-1">
            {title}
          </Typography>
        </div>
      </div>
    </Popover>
  );
};

export default CardComic;

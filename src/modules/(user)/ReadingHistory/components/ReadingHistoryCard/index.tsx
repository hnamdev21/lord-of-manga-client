import Image from "next/image";
import React from "react";
import { FaBookmark, FaDollarSign } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";

import styles from "./styles.module.scss";

type ReadingHistoryCardProps = {
  comic: Comic;
  currentOrdinal: number;
  onClickRemove: (comic: Comic) => void;
};

const ReadingHistoryCard = ({ comic, currentOrdinal, onClickRemove }: ReadingHistoryCardProps) => {
  const { coverPath, title, type } = comic;
  const currentSlug = comic.chapters.find((chapter) => chapter.ordinal === currentOrdinal)?.slug;

  return (
    <div className={styles.card}>
      <Button className={styles.card__bookmark} element="button" type="button" variant="plain" size="sm">
        <FaBookmark />
      </Button>

      <div className={styles.card__type}>
        {type === "FREE" ? (
          <Typography tag="span" fontSize="sm" fontWeight="bold">
            FREE
          </Typography>
        ) : (
          <Typography tag="span" fontSize="sm" fontWeight="bold">
            <FaDollarSign />
          </Typography>
        )}
      </div>

      <div className={styles.card__top}>
        <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + coverPath} alt={`Cover image of ${title}`} layout="fill" />

        <div className={styles.card__top__overlay}>
          <Button element="button" type="button" variant="outline" size="sm" className={styles.button__remove} onClick={() => onClickRemove(comic)}>
            Remove
          </Button>
          <Button href={`/comics/${comic.slug}/${currentSlug}`} size="sm" className={styles.button__read}>
            Continue Reading
          </Button>
        </div>
      </div>

      <div className={styles.card__bottom}>
        <Typography tag="h6" className="line-clamp-1">
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default ReadingHistoryCard;

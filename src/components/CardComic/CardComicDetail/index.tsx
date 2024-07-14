import Image from "next/image";
import React from "react";
import { FaBookmark, FaComment, FaEye } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { apiUrl } from "@/constants/config";
import { Comic } from "@/types/data";
import { timestampToDateTime } from "@/utils/formatter";

import styles from "./styles.module.scss";

type Props = Comic;

const CardComicDetail = ({ ...props }: Props) => {
  const { title, description, author, coverPath, chapters, categories, creator, createdAt, updatedAt, viewCount, slug, status } = props;

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.container__coverContainer}>
          <Image src={apiUrl + "/uploads/" + coverPath} alt={`Cover image of ${title}`} layout="fill" objectFit="cover" />
        </div>

        <div className={styles.container__info}>
          <Typography fontSize="lg" fontWeight="bold" tag="h5" className="line-clamp-1">
            {title}
          </Typography>

          <Typography tag="h6" className="line-clamp-1" fontWeight="extrabold">
            Status: {status}
          </Typography>
          <Typography tag="h6" className="line-clamp-1">
            Author: {author}
          </Typography>
          <Typography tag="h6" className="line-clamp-1">
            Total chapters: {chapters.length}
          </Typography>

          <Typography tag="h6" className="line-clamp-1">
            Publisher: {creator.fullName}
          </Typography>

          <Typography tag="h6" className="line-clamp-1">
            Categories: {categories.map((category) => category.name).join(", ")}
          </Typography>

          <Typography tag="h6" className="line-clamp-1">
            Created at: {timestampToDateTime(createdAt)}
          </Typography>
          <Typography tag="h6" className="line-clamp-1">
            Last updated at: {timestampToDateTime(updatedAt)}
          </Typography>

          <div className={styles.container__info__stats}>
            <Typography tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
              <FaComment /> 100
            </Typography>
            <Typography tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
              <FaEye /> {viewCount}
            </Typography>
          </div>

          <Typography className="line-clamp-6">{description}</Typography>

          <div className={styles.container__info__actions}>
            <Button className="block flex-1 text-center" href={"/comics/" + slug}>
              Read
            </Button>

            <Button className="w-[10%]" element="button" type="button" variant="outline" color="dark" icon>
              <FaBookmark />
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardComicDetail;

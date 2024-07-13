import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaComment, FaEye } from "react-icons/fa";

import { localApiUrl } from "@/constants/config";
import { Comic } from "@/types/data";

import Button from "../Button";
import Typography from "../Typography";
import styles from "./styles.module.scss";

type Props = Comic;

const CardComicHorizontal = ({ title, coverPath, description, slug, viewCount, categories }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.container} onClick={() => router.push("/comics/" + slug)}>
      <div className={styles.container__coverContainer}>
        <Image src={localApiUrl + "/uploads/" + coverPath} alt={`Cover image of ${title}`} layout="fill" objectFit="cover" />
      </div>

      <div className={styles.container__content}>
        <div>
          <Typography tag="h6" className="line-clamp-1">
            {title}
          </Typography>

          <Typography tag="p" fontSize="sm" className="line-clamp-3">
            {description}
          </Typography>
        </div>

        <div className={styles.container__content__bottom}>
          <div className={styles.container__content__bottom__categories}>
            {categories.slice(0, 2).map((category) => (
              <Button href="#" variant="outline" size="xs" key={category.slug}>
                {category.name}
              </Button>
            ))}
          </div>

          <div className={styles.container__content__bottom__stats}>
            <div className={styles.container__content__bottom__stats__item}>
              <FaComment />
              <Typography tag="span" fontSize="xs">
                1.2k
              </Typography>
            </div>

            <div className={styles.container__content__bottom__stats__item}>
              <FaEye />
              <Typography tag="span" fontSize="xs">
                {viewCount}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComicHorizontal;

import { Card, Modal, Statistic, StatisticProps } from "antd";
import React from "react";
import CountUp from "react-countup";
import { FaTimes } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { VND_CURRENCY } from "@/constants/sign";
import { Chapter, Comic } from "@/types/data";
import { timestampToDateTime } from "@/utils/formatter";

import PreviewChapterImageModal from "./PreviewChapterImageModal";
import styles from "./styles.module.scss";

type ChapterDetailModalProps = {
  page?: "admin" | "user";
  comic: Comic;
  chapter: Chapter;
};

const formatter: StatisticProps["formatter"] = (value) => <CountUp end={value as number} separator="." />;

const ChapterDetailModal = ({ comic, chapter }: ChapterDetailModalProps) => {
  const [modalApi, contextHolder] = Modal.useModal();

  const onPreview = () => {
    modalApi.info({
      title: (
        <Typography tag="h1" fontSize="xl" fontWeight="bold" align="center">
          Preview {chapter.title}
        </Typography>
      ),
      content: <PreviewChapterImageModal comic={comic} chapter={chapter} />,
      width: "50%",
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
    });
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.container__top}>
          <div className={styles.content}>
            <Card bordered={false} className={styles.content__item}>
              <Statistic title="NO." value={chapter.ordinal} formatter={formatter} />
            </Card>
            <Card bordered={false} className={styles.content__item}>
              <Statistic title="Total pages" value={chapter.totalPages} formatter={formatter} />
            </Card>
            <Card bordered={false} className={styles.content__item}>
              <Statistic title="Views" value={100000} formatter={formatter} />
            </Card>
            <Card bordered={false} className={styles.content__item}>
              <Statistic title="Comments" value={100000} formatter={formatter} />
            </Card>
            <Card bordered={false} className={styles.content__item}>
              <Statistic title="Total purchase" value={100000} formatter={formatter} suffix={VND_CURRENCY} />
            </Card>

            <div className="col-span-5">
              <Typography className="flex items-center gap-[.5rem]">
                Total pages: {chapter.totalPages} pages
                <Button element="button" type="button" size="xs" onClick={() => onPreview()}>
                  Preview
                </Button>
              </Typography>

              <Typography>Created at: {timestampToDateTime(chapter.createdAt)}</Typography>
              <Typography>Updated at: {timestampToDateTime(chapter.updatedAt)}</Typography>
            </div>
          </div>
        </div>
      </div>

      {contextHolder}
    </React.Fragment>
  );
};

export default ChapterDetailModal;

import { message, Modal } from "antd";
import cn from "classnames";
import React from "react";
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import { FaComment, FaEye, FaTimes } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import NOTIFICATION from "@/constants/notification";
import { Comic } from "@/types/data";
import { timestampToDateTime } from "@/utils/formatter";

import ChapterDetail from "./ChapterDetail";
import styles from "./styles.module.scss";

type ChaptersProps = {
  comic: Comic;
};

const Chapters = ({ comic }: ChaptersProps) => {
  const [chapters, setChapters] = React.useState<Comic["chapters"]>(comic.chapters);
  const [reorderMode, setReorderMode] = React.useState<boolean>(false);
  const [modalApi, modalHolder] = Modal.useModal();

  const onChange = (_sourceId: string, sourceIndex: number, targetIndex: number) => {
    const _chapters = swap(chapters, sourceIndex, targetIndex);
    setChapters(_chapters);
  };

  const onDone = async () => {
    setReorderMode(false);
  };

  const onDetail = (id: string) => {
    const chapter = chapters.find((chapter) => chapter.id === id);

    if (!chapter) {
      message.error(NOTIFICATION.SOMETHING_WENT_WRONG);
      return;
    }

    modalApi.info({
      title: (
        <Typography tag="h1" fontSize="xl" fontWeight="bold" align="center">
          {comic.title} - {chapter.title}
        </Typography>
      ),
      width: 1640,
      content: <ChapterDetail chapter={chapter} />,
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaTimes />,
    });
  };

  return (
    <div
      className="max-w-[160rem] h-[70vh] max-h-[70vh] mx-auto grid grid-cols-12 grid-rows-none gap-[2rem]"
      style={{
        gridTemplateRows: "auto 1fr",
      }}
    >
      <div className="col-span-12 grid grid-cols-12 gap-[2rem]">
        <Button
          element="button"
          type="button"
          variant={reorderMode ? "solid" : "outline"}
          onClick={() => (reorderMode ? onDone() : setReorderMode(!reorderMode))}
          className="col-start-12 col-span-1 block"
          style={{ width: "100%" }}
        >
          {reorderMode ? "Done" : "Reorder"}
        </Button>
      </div>

      <GridContextProvider onChange={onChange}>
        <GridDropZone id="chapters" boxesPerRow={1} rowHeight={70} className={styles.container__drag} disableDrag={!reorderMode} disableDrop={!reorderMode}>
          {chapters.map((chapter) => {
            return (
              <GridItem
                key={chapter.id}
                className={cn(styles.container__item, {
                  [styles.container__item__inactive]: !reorderMode,
                  [styles.container__item__active]: reorderMode,
                })}
              >
                <div
                  className="w-full h-full bg-[var(--color-dark)] p-[1rem] rounded-md flex items-center justify-between"
                  onClick={() => (reorderMode ? message.error("You can't view chapter detail while reordering") : onDetail(chapter.id))}
                >
                  <Typography tag="h3" fontSize="lg" fontWeight="bold">
                    {chapter.title}
                  </Typography>

                  <div className="flex flex-col justify-between">
                    <Typography tag="p" fontSize="sm">
                      {timestampToDateTime(chapter.createdAt)}
                    </Typography>
                    <div className="flex items-center gap-[1.5rem]">
                      <Typography tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
                        <FaComment /> {chapter.comments.length}
                      </Typography>
                      <Typography tag="h6" className="line-clamp-1 flex items-center gap-[.5rem]">
                        <FaEye /> {chapter.viewCount}
                      </Typography>
                    </div>
                  </div>
                </div>
              </GridItem>
            );
          })}
        </GridDropZone>
      </GridContextProvider>

      {modalHolder}
    </div>
  );
};

export default Chapters;

import Image from "next/image";
import React from "react";

import { localApiUrl } from "@/constants/config";
import { Chapter, Comic } from "@/types/data";

type PreviewChapterImageModalProps = {
  comic: Comic;
  chapter: Chapter;
};

const PreviewChapterImageModal = ({ comic, chapter }: PreviewChapterImageModalProps) => {
  return (
    <div className="w-full max-h-[60vh] overflow-y-auto">
      {Array.from({ length: chapter.totalPages }).map((_, index) => (
        <div className="col-start-3 col-span-8 relative" key={index}>
          <Image
            src={localApiUrl + "/uploads/comic/" + comic.id + "/chapter-" + chapter.ordinal + "/" + index + ".png"}
            alt={`Chapter image of ${index}`}
            width={1920}
            height={1080}
            objectFit="contain"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              margin: "0 auto",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PreviewChapterImageModal;

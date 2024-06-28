import React from "react";

import { Chapter } from "@/types/data";

type ChapterDetailProps = {
  chapter: Chapter;
};

const ChapterDetail = ({ chapter }: ChapterDetailProps) => {
  return (
    <div>
      <h1>{chapter.title}</h1>
    </div>
  );
};

export default ChapterDetail;

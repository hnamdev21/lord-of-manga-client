import React from "react";

type PageProps = {
  params: {
    comicSlug: string;
    chapterSlug: string;
  };
};

export const ChapterDetailPage = ({ params }: PageProps) => {
  return <div>ChapterDetailPage</div>;
};

import React from "react";

type PageProps = {
  params: {
    comicSlug: string;
    chapterSlug: string;
  };
};

const ChapterDetailManagementPage = ({ params }: PageProps) => {
  return <div>ChapterDetailManagementPage</div>;
};

export default ChapterDetailManagementPage;

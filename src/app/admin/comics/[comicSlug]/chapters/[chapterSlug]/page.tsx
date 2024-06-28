import React from "react";

type PageProps = {
  params: {
    comicSlug: string;
    chapterSlug: string;
  };
};

const ChapterDetailManagementPage = ({ params }: PageProps) => {
  return (
    <div>
      {params.comicSlug} - {params.chapterSlug}
    </div>
  );
};

export default ChapterDetailManagementPage;

import React from "react";

import ChapterManagementModule from "@/modules/(user)/ComicMangement/ChapterManagement";

type ChaptersPageProps = {
  params: {
    comicSlug: string;
  };
};

const ChapterManagementPage = ({ params }: ChaptersPageProps) => {
  return <ChapterManagementModule comicSlug={params.comicSlug} />;
};

export default ChapterManagementPage;

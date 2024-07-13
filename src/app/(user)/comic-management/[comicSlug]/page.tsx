import React from "react";

import ChapterManagementModule from "@/modules/(user)/ComicMangement/ChapterManagement";

type Props = {
  params: {
    comicSlug: string;
  };
};

const ChapterManagementPage = ({ params }: Props) => {
  return <ChapterManagementModule comicSlug={params.comicSlug} />;
};

export default ChapterManagementPage;

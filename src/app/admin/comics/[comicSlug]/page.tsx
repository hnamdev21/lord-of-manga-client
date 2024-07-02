import React from "react";

import ChaptersModule from "@/modules/(admin)/Chapters";

type ChaptersPageProps = {
  params: {
    comicSlug: string;
  };
};

const ChaptersPage = ({ params }: ChaptersPageProps) => {
  return <ChaptersModule comicSlug={params.comicSlug} />;
};

export default ChaptersPage;

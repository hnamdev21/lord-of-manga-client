import React from "react";

import ChaptersModule from "@/modules/(admin)/Chapters";

type Props = {
  params: {
    comicSlug: string;
  };
};

const ChaptersPage = ({ params }: Props) => {
  return <ChaptersModule comicSlug={params.comicSlug} />;
};

export default ChaptersPage;

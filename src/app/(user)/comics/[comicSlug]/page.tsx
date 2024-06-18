import React from "react";

import ComicDetailModule from "@/modules/(user)/ComicDetail";

type PageProps = {
  params: {
    comicSlug: string;
  };
};

const ComicDetailPage = ({ params }: PageProps) => {
  return <ComicDetailModule comicSlug={params.comicSlug} />;
};

export default ComicDetailPage;

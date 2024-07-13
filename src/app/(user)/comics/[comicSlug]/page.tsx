import React from "react";

import ComicDetailModule from "@/modules/(user)/ComicDetail";

type Props = {
  params: {
    comicSlug: string;
  };
};

const ComicDetailPage = ({ params }: Props) => {
  return <ComicDetailModule comicSlug={params.comicSlug} />;
};

export default ComicDetailPage;

import React from "react";

import ReadingModule from "@/modules/(user)/Reading";

type PageProps = {
  params: {
    comicSlug: string;
    chapterSlug: string;
  };
};

const ReadingPage = ({ params }: PageProps) => {
  return <ReadingModule {...params} />;
};

export default ReadingPage;

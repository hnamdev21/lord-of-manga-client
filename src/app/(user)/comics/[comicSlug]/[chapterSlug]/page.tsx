import React from "react";

import ReadingModule from "@/modules/(user)/Reading";

type Props = {
  params: {
    comicSlug: string;
    chapterSlug: string;
  };
};

const ReadingPage = ({ params }: Props) => {
  return <ReadingModule {...params} />;
};

export default ReadingPage;

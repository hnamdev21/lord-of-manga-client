import React from "react";

type PageProps = {
  params: {
    comicSlug: string;
  };
};

const ComicDetailManagementPage = ({ params }: PageProps) => {
  return <div>{params.comicSlug}</div>;
};

export default ComicDetailManagementPage;

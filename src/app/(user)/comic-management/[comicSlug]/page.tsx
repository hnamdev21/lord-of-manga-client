import React from "react";

type PageProps = {
  params: {
    comicSlug: string;
  };
};

const User_ComicDetailManagementPage = ({ params }: PageProps) => {
  return <div>{params.comicSlug}</div>;
};

export default User_ComicDetailManagementPage;

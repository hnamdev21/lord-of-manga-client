import React from "react";

type PageProps = {
  params: {
    comicSlug: string;
    chapterSlug: string;
  };
};

const User_ChapterDetailManagementPage = ({ params }: PageProps) => {
  return (
    <div>
      {params.comicSlug} - {params.chapterSlug}
    </div>
  );
};

export default User_ChapterDetailManagementPage;

import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const TagDetailManagementPage = ({ params }: PageProps) => {
  return <div>{params.id}</div>;
};

export default TagDetailManagementPage;

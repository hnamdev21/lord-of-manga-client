import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const CategoryDetailManagementPage = ({ params }: PageProps) => {
  return <div>{params.id}</div>;
};

export default CategoryDetailManagementPage;

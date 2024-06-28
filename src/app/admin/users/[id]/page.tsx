import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const UserDetailManagementPage = ({ params }: PageProps) => {
  return <div>{params.id}</div>;
};

export default UserDetailManagementPage;

import React from "react";
import { FaMarker } from "react-icons/fa";

import Button from "@/components/Button";
import { DefaultRoleNames } from "@/constants/default-data";
import { Role } from "@/types/data";

type ActionButtonsProps = {
  role: Role;
};

const ActionButtons = ({ role }: ActionButtonsProps) => {
  const isDefaultRole = DefaultRoleNames.includes(role.name);

  return (
    <React.Fragment>
      {!isDefaultRole && (
        <Button
          element="button"
          type="button"
          shape="square"
          color="dark"
          variant="outline"
          size="sm"
          onClick={() => {}}
          className="flex justify-center items-center"
        >
          <FaMarker />
        </Button>
      )}
    </React.Fragment>
  );
};

export default ActionButtons;

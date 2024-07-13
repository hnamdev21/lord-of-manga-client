import React from "react";
import { FaMarker } from "react-icons/fa";

import Button from "@/components/Button";
import { DefaultRoleNames } from "@/constants/default-data";
import { Role } from "@/types/data";

type Props = {
  role: Role;
};

const RoleActions = ({ role }: Props) => {
  const isDefaultRole = DefaultRoleNames.includes(role.name);

  return (
    <React.Fragment>
      {!isDefaultRole && (
        <Button element="button" type="button" color="dark" variant="outline" size="sm" onClick={() => {}}>
          <FaMarker />
        </Button>
      )}
    </React.Fragment>
  );
};

export default RoleActions;

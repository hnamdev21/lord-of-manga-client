import React from "react";
import { FaMarker } from "react-icons/fa";

import Button from "@/components/Button";
import { Role } from "@/types/data";

type Props = {
  role: Role;
  onEdit: () => void;
};

const RoleActions = ({ role, onEdit }: Props) => {
  return (
    <React.Fragment>
      {!role.defaultValue && (
        <Button element="button" type="button" color="dark" variant="outline" size="sm" icon onClick={onEdit}>
          <FaMarker />
        </Button>
      )}
    </React.Fragment>
  );
};

export default RoleActions;

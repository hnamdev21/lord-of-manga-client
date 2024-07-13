import React from "react";
import { FaEye, FaUserSlash } from "react-icons/fa";

import Button from "@/components/Button";

type Props = {
  onBan: () => void;
  onViewDetail: () => void;
};

const UserActions = ({ onViewDetail, onBan }: Props) => {
  return (
    <React.Fragment>
      <Button element="button" type="button" color="dark" variant="plain" size="sm" onClick={onViewDetail} icon>
        <FaEye />
      </Button>
      <Button element="button" type="button" color="danger" size="sm" onClick={onBan} icon>
        <FaUserSlash />
      </Button>
    </React.Fragment>
  );
};

export default UserActions;

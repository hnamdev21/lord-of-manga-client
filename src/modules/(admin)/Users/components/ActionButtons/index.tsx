import React from "react";
import { FaEye, FaUserSlash } from "react-icons/fa";

import Button from "@/components/Button";

type ActionButtonsProps = {
  onBan: () => void;
  onViewDetail: () => void;
};

const ActionButtons = ({ onViewDetail, onBan }: ActionButtonsProps) => {
  return (
    <React.Fragment>
      <Button element="button" type="button" color="dark" variant="plain" size="sm" onClick={onViewDetail} className="flex justify-center items-center">
        <FaEye />
      </Button>
      <Button element="button" type="button" color="danger" size="sm" onClick={onBan} className="flex justify-center items-center">
        <FaUserSlash />
      </Button>
    </React.Fragment>
  );
};

export default ActionButtons;

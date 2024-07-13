import { Popover } from "antd";
import React from "react";
import { FaMarker, FaTrash } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";

type ActionButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const TagActions = ({ onEdit, onDelete }: ActionButtonsProps) => {
  return (
    <React.Fragment>
      <Popover content={<Typography fontSize="sm">Edit</Typography>}>
        <Button
          element="button"
          type="button"
          shape="square"
          color="dark"
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="flex justify-center items-center"
        >
          <FaMarker />
        </Button>
      </Popover>
      <Popover content={<Typography fontSize="sm">Delete</Typography>}>
        <Button element="button" type="button" shape="square" color="danger" size="sm" onClick={onDelete} className="flex justify-center items-center">
          <FaTrash />
        </Button>
      </Popover>
    </React.Fragment>
  );
};

export default TagActions;

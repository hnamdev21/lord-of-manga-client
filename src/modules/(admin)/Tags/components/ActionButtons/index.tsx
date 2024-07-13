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
        <Button element="button" type="button" icon color="dark" variant="outline" size="sm" onClick={onEdit}>
          <FaMarker />
        </Button>
      </Popover>
      <Popover content={<Typography fontSize="sm">Delete</Typography>}>
        <Button element="button" type="button" color="danger" size="sm" onClick={onDelete}>
          <FaTrash />
        </Button>
      </Popover>
    </React.Fragment>
  );
};

export default TagActions;

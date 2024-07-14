import { Popover } from "antd";
import React from "react";
import { FaEye, FaMarker, FaTrash } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { Comic } from "@/types/data";

type Props = {
  slug: Comic["slug"];
  onViewDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const ChapterActions = ({ onEdit, onViewDetail, onDelete }: Props) => {
  return (
    <React.Fragment>
      <Popover content={<Typography fontSize="sm">View detail</Typography>}>
        <Button icon element="button" type="button" color="dark" variant="plain" size="sm" onClick={onViewDetail}>
          <FaEye />
        </Button>
      </Popover>
      <Popover content={<Typography fontSize="sm">Edit</Typography>}>
        <Button icon element="button" type="button" color="dark" variant="outline" size="sm" onClick={onEdit}>
          <FaMarker />
        </Button>
      </Popover>
      <Popover content={<Typography fontSize="sm">Delete</Typography>}>
        <Button icon element="button" type="button" color="danger" size="sm" onClick={onDelete}>
          <FaTrash />
        </Button>
      </Popover>
    </React.Fragment>
  );
};
export default ChapterActions;

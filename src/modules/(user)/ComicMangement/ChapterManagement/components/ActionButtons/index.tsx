import { Popover } from "antd";
import React from "react";
import { FaEye, FaMarker, FaTrash } from "react-icons/fa";

import Button from "@/components/Button";
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
      <Popover content="View detail">
        <Button
          shape="square"
          element="button"
          type="button"
          color="dark"
          variant="plain"
          size="sm"
          onClick={onViewDetail}
          className="flex justify-center items-center"
        >
          <FaEye />
        </Button>
      </Popover>
      <Popover content="Edit">
        <Button
          shape="square"
          element="button"
          type="button"
          color="dark"
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="flex justify-center items-center"
        >
          <FaMarker />
        </Button>
      </Popover>
      <Popover content="Delete">
        <Button shape="square" element="button" type="button" color="danger" size="sm" onClick={onDelete} className="flex justify-center items-center">
          <FaTrash />
        </Button>
      </Popover>
    </React.Fragment>
  );
};

export default ChapterActions;

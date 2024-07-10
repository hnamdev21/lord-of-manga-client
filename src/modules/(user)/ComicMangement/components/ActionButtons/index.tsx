import { Popover } from "antd";
import React from "react";
import { FaEye, FaList, FaMarker, FaTrash } from "react-icons/fa";

import Button from "@/components/Button";
import Path from "@/constants/path";
import { Comic } from "@/types/data";

type ActionButtonsProps = {
  slug: Comic["slug"];
  onViewDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const ActionButtons = ({ slug, onViewDetail, onEdit, onDelete }: ActionButtonsProps) => {
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
      <Popover content="View all chapters">
        <Button
          shape="square"
          href={Path.USER.COMIC_MANAGEMENT + "/" + slug}
          color="dark"
          variant="plain"
          size="sm"
          className="flex justify-center items-center"
        >
          <FaList />
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

export default ActionButtons;

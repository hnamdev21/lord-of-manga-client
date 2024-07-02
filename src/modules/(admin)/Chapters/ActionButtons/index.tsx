import { Popover } from "antd";
import React from "react";
import { FaBan, FaCheck, FaEye, FaTrash } from "react-icons/fa";

import Button from "@/components/Button";
import { Comic, ComicStatus } from "@/types/data";

type ActionButtonsProps = {
  slug: Comic["slug"];
  status: Comic["status"];
  onViewDetail: () => void;
  onBan: () => void;
  onApprove: () => void;
  onDelete: () => void;
};

const ActionButtons = ({ status, onViewDetail, onBan, onApprove, onDelete }: ActionButtonsProps) => {
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
      <Popover content="Ban">
        <Button
          shape="square"
          element="button"
          type="button"
          color="danger"
          variant="outline"
          size="sm"
          onClick={onBan}
          className="flex justify-center items-center"
        >
          <FaBan />
        </Button>
      </Popover>
      <Popover content="Approve">
        {status === ComicStatus.PENDING && (
          <Button shape="square" element="button" type="button" color="success" size="sm" onClick={onApprove} className="flex justify-center items-center">
            <FaCheck />
          </Button>
        )}
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

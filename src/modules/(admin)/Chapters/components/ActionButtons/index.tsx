import { Popover } from "antd";
import React from "react";
import { FaBan, FaCheck, FaEye, FaTrash } from "react-icons/fa";

import Button from "@/components/Button";
import { Comic, ComicStatus } from "@/types/data";

type Props = {
  slug: Comic["slug"];
  status: Comic["status"];
  onViewDetail: () => void;
  onBan: () => void;
  onApprove: () => void;
  onDelete: () => void;
};

const ChapterActions = ({ status, onViewDetail, onBan, onApprove, onDelete }: Props) => {
  return (
    <React.Fragment>
      <Popover content="View detail">
        <Button icon element="button" type="button" color="dark" variant="plain" size="sm" onClick={onViewDetail}>
          <FaEye />
        </Button>
      </Popover>
      <Popover content="Ban">
        <Button icon element="button" type="button" color="danger" variant="outline" size="sm" onClick={onBan}>
          <FaBan />
        </Button>
      </Popover>
      {status === ComicStatus.PENDING && (
        <Popover content="Approve">
          <Button icon element="button" type="button" color="success" size="sm" onClick={onApprove}>
            <FaCheck />
          </Button>
        </Popover>
      )}
      <Popover content="Delete">
        <Button icon element="button" type="button" color="danger" size="sm" onClick={onDelete}>
          <FaTrash />
        </Button>
      </Popover>
    </React.Fragment>
  );
};

export default ChapterActions;

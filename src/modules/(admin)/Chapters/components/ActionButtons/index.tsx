import { Popover } from "antd";
import React from "react";
import { FaBan, FaCheck, FaEye, FaTrash } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
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
      <Popover content={<Typography fontSize="sm">View detail</Typography>}>
        <Button icon element="button" type="button" color="dark" variant="plain" size="sm" onClick={onViewDetail}>
          <FaEye />
        </Button>
      </Popover>
      <Popover content={<Typography fontSize="sm">Ban</Typography>}>
        <Button icon element="button" type="button" color="danger" variant="outline" size="sm" onClick={onBan}>
          <FaBan />
        </Button>
      </Popover>
      {status === ComicStatus.PENDING && (
        <Popover content={<Typography fontSize="sm">Approve</Typography>}>
          <Button icon element="button" type="button" color="success" size="sm" onClick={onApprove}>
            <FaCheck />
          </Button>
        </Popover>
      )}
      <Popover content={<Typography fontSize="sm">Delete</Typography>}>
        <Button icon element="button" type="button" color="danger" size="sm" onClick={onDelete}>
          <FaTrash />
        </Button>
      </Popover>
    </React.Fragment>
  );
};

export default ChapterActions;

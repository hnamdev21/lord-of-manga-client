import { Popover } from "antd";
import React from "react";
import { FaBan, FaCheck, FaEye, FaList, FaTrash } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Path from "@/constants/path";
import { Comic, ComicStatus } from "@/types/data";

type Props = {
  slug: Comic["slug"];
  status: Comic["status"];
  onViewDetail: () => void;
  onBan: () => void;
  onApprove: () => void;
  onDelete: () => void;
};

const ComicActions = ({ slug, status, onViewDetail, onBan, onApprove, onDelete }: Props) => {
  return (
    <React.Fragment>
      <Popover content={<Typography fontSize="sm">View detail</Typography>}>
        <Button icon element="button" type="button" color="dark" variant="plain" size="sm" onClick={onViewDetail}>
          <FaEye />
        </Button>
      </Popover>
      <Popover content={<Typography fontSize="sm">View all chapters</Typography>}>
        <Button icon href={Path.ADMIN.COMICS + "/" + slug} color="dark" variant="plain" size="sm">
          <FaList />
        </Button>
      </Popover>
      <Popover content={<Typography fontSize="sm">Ban</Typography>}>
        <Button icon element="button" type="button" color="danger" variant="outline" size="sm" onClick={onBan}>
          <FaBan />
        </Button>
      </Popover>
      {status === ComicStatus.PENDING && (
        <Popover content={<Typography fontSize="sm">Approve</Typography>}>
          <Button element="button" type="button" color="success" size="sm" onClick={onApprove}>
            <FaCheck />
          </Button>
        </Popover>
      )}
      <Popover content={<Typography fontSize="sm">Delete</Typography>}>
        <Button element="button" type="button" color="danger" size="sm" onClick={onDelete}>
          <FaTrash />
        </Button>
      </Popover>
    </React.Fragment>
  );
};

export default ComicActions;

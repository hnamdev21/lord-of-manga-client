import { Popover } from "antd";
import React from "react";
import { FaBan, FaCheck, FaEye, FaList, FaTrash } from "react-icons/fa";

import Button from "@/components/Button";
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
        <Button shape="square" href={Path.ADMIN.COMICS + "/" + slug} color="dark" variant="plain" size="sm" className="flex justify-center items-center">
          <FaList />
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
      {status === ComicStatus.PENDING && (
        <Popover content="Approve">
          <Button shape="square" element="button" type="button" color="success" size="sm" onClick={onApprove} className="flex justify-center items-center">
            <FaCheck />
          </Button>
        </Popover>
      )}
      <Popover content="Delete">
        <Button shape="square" element="button" type="button" color="danger" size="sm" onClick={onDelete} className="flex justify-center items-center">
          <FaTrash />
        </Button>
      </Popover>
    </React.Fragment>
  );
};

export default ComicActions;

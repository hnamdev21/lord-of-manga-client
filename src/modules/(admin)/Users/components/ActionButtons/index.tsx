import { Popover } from "antd";
import React from "react";
import { FaEye, FaMarker, FaUserSlash } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { DefaultRoleValue } from "@/constants/default-data";
import { isUserHaveRole, User } from "@/types/data";

type Props = {
  user: User;
  onBan: () => void;
  onViewDetail: () => void;
  onEdit: () => void;
};

const UserActions = ({ user, onViewDetail, onBan, onEdit }: Props) => {
  return (
    <React.Fragment>
      <Popover content={<Typography fontSize="sm">View detail</Typography>}>
        <Button element="button" type="button" color="dark" variant="plain" size="sm" onClick={onViewDetail} icon>
          <FaEye />
        </Button>
      </Popover>
      {isUserHaveRole(user, DefaultRoleValue.EMPLOYEE) && (
        <Popover content={<Typography fontSize="sm">Edit</Typography>}>
          <Button element="button" type="button" color="dark" variant="outline" size="sm" onClick={onEdit} icon>
            <FaMarker />
          </Button>
        </Popover>
      )}
      <Popover content={<Typography fontSize="sm">Ban</Typography>}>
        <Button element="button" type="button" color="danger" size="sm" onClick={onBan} icon>
          <FaUserSlash />
        </Button>
      </Popover>
    </React.Fragment>
  );
};

export default UserActions;

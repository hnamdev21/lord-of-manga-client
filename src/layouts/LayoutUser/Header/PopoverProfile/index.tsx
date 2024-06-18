import React from "react";

import Button from "@/components/Button";
import Path from "@/constants/path";
import { AuthContext } from "@/providers/AuthProvider";

const PopoverProfile = () => {
  const authContext = React.use(AuthContext);

  return (
    <div className="w-[10rem] flex flex-col gap-[.5rem]">
      <Button variant="plain" size="sm" className="hover:text-red-500 text-center" href={Path.USER.PROFILE}>
        Profile
      </Button>
      <Button variant="plain" size="sm" className="hover:text-red-500" element="button" onClick={authContext?.signOut} type="button">
        Sign Out
      </Button>
    </div>
  );
};

export default PopoverProfile;
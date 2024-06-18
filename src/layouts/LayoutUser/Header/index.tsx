"use client";

import { Avatar, Popover } from "antd";
import Link from "next/link";
import React from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import Path from "@/constants/path";
import { AuthContext } from "@/providers/AuthProvider";

import PopoverProfile from "./PopoverProfile";
import SearchBox from "./SearchBox";
import styles from "./styles.module.scss";

const Header = () => {
  const authContext = React.use(AuthContext);

  return (
    <header className={styles.header}>
      <Container className="py-[1rem]">
        <div className="col-span-2">
          <Logo />
        </div>

        <div className="col-start-5 col-span-4">
          <SearchBox />
        </div>

        <div className="col-start-11 col-span-2 flex justify-end gap-[2rem]">
          {authContext?.auth.token ? (
            <Popover content={<PopoverProfile />}>
              <Link href={Path.USER.PROFILE}>
                <Avatar
                  size={40}
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="User Avatar"
                  className="cursor-pointer"
                />
              </Link>
            </Popover>
          ) : (
            <React.Fragment>
              <Button href={Path.AUTH.SIGN_IN} variant="outline">
                Sign In
              </Button>
              <Button href={Path.AUTH.SIGN_UP}>Sign Up</Button>
            </React.Fragment>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;

import React from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

import SearchBox from "./SearchBox";
import styles from "./styles.module.scss";

const Header = () => {
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
          <Button href="/sign-in" variant="outline">
            Sign In
          </Button>
          <Button href="/sign-up">Sign Up</Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;

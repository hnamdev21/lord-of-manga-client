import React from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";

import SearchBox from "./SearchBox";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div
        className="absolute top-0 left-0 w-full h-full blur-md"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      />

      <Container className="relative py-[2.4rem]">
        <div className="col-span-2">
          <Typography tag="h4">Logo</Typography>
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

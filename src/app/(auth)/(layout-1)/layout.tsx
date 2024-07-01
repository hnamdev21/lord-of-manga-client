import React from "react";

import Container from "@/components/Container";

import styles from "./styles.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.container}>
      <Container className={styles.container__inner}>
        <div className={styles.container__inner__left} />

        <div className={styles.container__inner__right}>
          <div className={styles.container__inner__right__content}>{children}</div>
        </div>
      </Container>
    </main>
  );
}

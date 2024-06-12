import React from "react";

import styles from "./styles.module.scss";

const SearchBox = () => {
  return (
    <div className={styles.searchBox}>
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="Naruto, Bleach, #top10, #trendy..." autoComplete="off" name="search" className={styles.input} />
        </div>
      </form>

      <div className={styles.searchBox__result}></div>
    </div>
  );
};

export default SearchBox;

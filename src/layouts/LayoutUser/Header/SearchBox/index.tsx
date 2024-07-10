"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { Divider } from "antd";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Typography from "@/components/Typography";
import { BaseResponse, SearchComicResponse } from "@/types/response";

import SearchResultItem from "./SearchResultItem";
import styles from "./styles.module.scss";

const SearchBox = () => {
  const [isFocus, setIsFocus] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const debouncedTerm = useDebounce(term, 500);
  const [data, setData] = React.useState<SearchComicResponse>({
    byTitle: [],
    byCategoryName: [],
    byTagName: [],
  });

  const searchComic = async (term: string) => {
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<SearchComicResponse>>(`/search?term=${term}`)).data;
    setData(data);
  };

  React.useEffect(() => {
    searchComic(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <div className={styles.searchBox}>
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Naruto, Bleach, top 10, trendy..."
            autoComplete="off"
            name="search"
            className={styles.input}
            onChange={(e) => setTerm(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </div>
      </form>

      <div className={`${styles.searchBox__result} ${isFocus ? styles.searchBox__result__show : ""}`}>
        <div className="mb-[2rem]">
          <Typography tag="h3" fontWeight="bold" className="mb-[1rem]" align="center">
            By title
          </Typography>
          <div className="flex flex-col gap-[1rem]">
            {data.byTitle.slice(0, 4).map((comic) => (
              <SearchResultItem key={comic.id} {...comic} />
            ))}
          </div>
        </div>

        <Divider className="my-[.5rem]" />

        <div className="mb-[2rem]">
          <Typography tag="h3" fontWeight="bold" className="mb-[1rem]" align="center">
            By category name
          </Typography>
          <div className="flex flex-col gap-[1rem]">
            {data.byCategoryName.slice(0, 4).map((comic) => (
              <SearchResultItem key={comic.id} {...comic} />
            ))}
          </div>
        </div>

        <Divider className="my-[.5rem]" />

        <div className="mb-[2rem]">
          <Typography tag="h3" fontWeight="bold" className="mb-[1rem]" align="center">
            By tag name
          </Typography>
          <div className="flex flex-col gap-[1rem]">
            {data.byTagName.slice(0, 4).map((comic) => (
              <SearchResultItem key={comic.id} {...comic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

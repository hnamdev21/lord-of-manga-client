"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { Divider } from "antd";
import Image from "next/image";
import React from "react";

import AXIOS_INSTANCE from "@/apis/instance";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { BaseResponse, SearchComicResponse } from "@/types/response";

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
    const { data } = (await AXIOS_INSTANCE.get<BaseResponse<SearchComicResponse>>(`/comics/search?term=${term}`)).data;
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
            placeholder="Naruto, Bleach, #top10, #trendy..."
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
              <div key={comic.id} className="flex h-[15rem] gap-[1rem]">
                <div className="w-1/5 bg-white rounded-md overflow-hidden">
                  <Image
                    src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.coverPath}
                    alt={`Cover image of ${comic.title}`}
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex-1">
                    <Typography tag="h4" fontWeight="md" className="line-clamp-1">
                      {comic.title}
                    </Typography>

                    <Typography tag="p" className="line-clamp-4">
                      {comic.description}
                    </Typography>
                  </div>

                  <div className="flex gap-[.5rem]">
                    {comic.tags.map((tag) => (
                      <Button size="sm" href="#" variant="outline">
                        {tag.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
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
              <div key={comic.id} className="flex h-[15rem] gap-[1rem]">
                <div className="w-1/5 bg-white rounded-md overflow-hidden">
                  <Image
                    src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.coverPath}
                    alt={`Cover image of ${comic.title}`}
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex-1">
                    <Typography tag="h4" fontWeight="md" className="line-clamp-1">
                      {comic.title}
                    </Typography>

                    <Typography tag="p" className="line-clamp-4">
                      {comic.description}
                    </Typography>
                  </div>

                  <div className="flex gap-[.5rem]">
                    {comic.tags.map((tag) => (
                      <Button size="sm" href="#" variant="outline">
                        {tag.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
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
              <div key={comic.id} className="flex h-[15rem] gap-[1rem]">
                <div className="w-1/5 bg-white rounded-md overflow-hidden">
                  <Image
                    src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.coverPath}
                    alt={`Cover image of ${comic.title}`}
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex-1">
                    <Typography tag="h4" fontWeight="md" className="line-clamp-1">
                      {comic.title}
                    </Typography>

                    <Typography tag="p" className="line-clamp-4">
                      {comic.description}
                    </Typography>
                  </div>

                  <div className="flex gap-[.5rem]">
                    {comic.tags.map((tag) => (
                      <Button size="sm" href="#" variant="outline">
                        {tag.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

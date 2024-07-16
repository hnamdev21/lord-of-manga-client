import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { apiUrl } from "@/constants/config";
import Path from "@/constants/path";
import { Comic } from "@/types/data";

type Props = Comic;

const SearchResultItem = (comic: Props) => {
  const router = useRouter();

  return (
    <div className="flex h-[15rem] gap-[1rem] cursor-pointer" onClick={() => router.push(Path.USER.COMICS + comic.slug)}>
      <div className="w-1/5 bg-white rounded-md overflow-hidden">
        <Image src={apiUrl + "/uploads/" + comic.coverPath} alt={`Cover image of ${comic.title}`} width={400} height={400} className="object-cover" />
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
          {comic.categories.map((category) => (
            <Button size="xs" href="#" variant="outline" key={category.slug}>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;

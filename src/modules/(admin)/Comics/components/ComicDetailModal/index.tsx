import { Card, Statistic, StatisticProps } from "antd";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";

import Button from "@/components/Button";
import { FaUpRightFromSquare } from "@/components/Icons";
import Typography from "@/components/Typography";
import Path from "@/constants/path";
import { VND_CURRENCY } from "@/constants/sign";
import { Comic } from "@/types/data";
import { timestampToDateTime } from "@/utils/formatter";

type ComicDetailModalProps = {
  comic: Comic;
};

const formatter: StatisticProps["formatter"] = (value) => <CountUp end={value as number} separator="." />;

const ComicDetailModal = ({ comic }: ComicDetailModalProps) => {
  return (
    <div className="h-[80vh] max-h-[60vh] flex flex-col gap-[1rem]">
      <div className="w-full h-[72.5%] grid grid-cols-12 gap-[1rem]">
        <div className="col-span-2 relative rounded-[8px] overflow-hidden shadow-lg">
          <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.coverPath} alt={`Cover image of ${comic.title}`} layout="fill" />
        </div>

        <div
          className="col-span-10 grid grid-cols-10 gap-[1rem]"
          style={{
            gridAutoRows: "min-content",
          }}
        >
          <Card bordered={false} className="col-span-2" style={{ height: "max-content" }}>
            <Statistic title="Views" value={100000} formatter={formatter} />
          </Card>
          <Card bordered={false} className="col-span-2" style={{ height: "max-content" }}>
            <Statistic title="Saved" value={100000} formatter={formatter} />
          </Card>
          <Card bordered={false} className="col-span-2" style={{ height: "max-content" }}>
            <Statistic title="Comments" value={100000} formatter={formatter} />
          </Card>
          <Card bordered={false} className="col-span-2" style={{ height: "max-content" }}>
            <Statistic title="User purchase" value={100000} formatter={formatter} />
          </Card>
          <Card bordered={false} className="col-span-2" style={{ height: "max-content" }}>
            <Statistic title="Total purchase" value={100000} formatter={formatter} suffix={VND_CURRENCY} />
          </Card>

          <div className="col-span-5">
            <Typography className="line-clamp-1">
              Author:{" "}
              <Typography tag="span" fontWeight="bold">
                {comic.author}
              </Typography>
            </Typography>

            <Typography className="flex items-center">
              Uploaded by: {comic.creator.username}
              <Button href={Path.ADMIN.USERS + "/" + comic.creator.username} size="xs" shape="square" color="dark" variant="plain">
                <FaUpRightFromSquare />
              </Button>
            </Typography>

            <Typography className="flex items-center">
              Total chapters: {comic.chapters.length} chapters
              <Button href={Path.ADMIN.COMICS + "/" + comic.slug} size="xs" shape="square" color="dark" variant="plain">
                <FaUpRightFromSquare />
              </Button>
            </Typography>

            <Typography className="line-clamp-1">Categories: {comic.categories.map((category) => category.name).join(", ")}</Typography>
            <Typography className="line-clamp-1">Tags: {comic.tags.map((tag) => tag.name).join(", ")}</Typography>

            <Typography>Created at: {timestampToDateTime(comic.createdAt)}</Typography>
            <Typography>Updated at: {timestampToDateTime(comic.updatedAt)}</Typography>
          </div>
        </div>
      </div>

      <div className="w-full line-clamp-[7]">{comic.description}</div>
    </div>
  );
};

export default ComicDetailModal;

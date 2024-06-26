import { Divider, Modal, Statistic, StatisticProps } from "antd";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import { FaBackspace } from "react-icons/fa";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { ComicStatusMapping, ComicTypeMapping } from "@/constants/mapping";
import { Comic } from "@/types/data";
import { numberToCurrency, timestampToDateTime } from "@/utils/formatter";

import Chapters from "./Chapters";

type ComicDetailProps = {
  comic: Comic;
};

const formatter: StatisticProps["formatter"] = (value) => <CountUp end={value as number} separator="." />;

const ComicDetail = ({ comic }: ComicDetailProps) => {
  const [modalApi, modalHolder] = Modal.useModal();

  const onOpenChapters = () => {
    modalApi.info({
      title: (
        <Typography tag="h1" fontSize="xl" fontWeight="bold" align="center">
          {comic.title} - Chapters
        </Typography>
      ),
      width: 1640,
      content: <Chapters comic={comic} />,
      icon: null,
      centered: true,
      footer: null,
      maskClosable: true,
      closable: true,
      closeIcon: <FaBackspace />,
    });
  };

  return (
    <div className="max-w-[160rem] h-[70vh] mx-auto grid grid-cols-12 gap-[2rem]">
      <div className="col-span-3 relative rounded-xl overflow-hidden">
        <Image src={process.env.NEXT_PUBLIC_LOCAL_API_URL + "/uploads/" + comic.coverPath} alt={`Cover image of ${comic.title}`} layout="fill" />
      </div>

      <div className="col-span-9 flex flex-col">
        <div className="w-full  grid grid-cols-9 gap-x-[2rem] gap-y-[1rem]">
          <Statistic title="Views" value={100000} formatter={formatter} className="col-span-1" />
          <Statistic title="Saved" value={100000} formatter={formatter} className="col-span-1" />
          <Statistic title="Comments" value={100000} formatter={formatter} className="col-span-1" />
          <Statistic title="User purchase" value={100000} formatter={formatter} className="col-span-1" />
          <Statistic title="Total purchase" value={100000} formatter={formatter} className="col-span-1" suffix="₫" />

          <div className="col-span-9">
            <Divider style={{ margin: "0" }} />
          </div>

          <div className="col-span-9">
            <Typography tag="p" className="mb-[1rem]">
              Created at: {timestampToDateTime(comic.createdAt)}
            </Typography>
            <Typography tag="p" className="mb-[1rem]">
              Last updated at: {timestampToDateTime(comic.updatedAt)}
            </Typography>

            <Typography tag="p" className="mb-[1rem]">
              Status: {ComicStatusMapping[comic.status]}
            </Typography>
            <Typography tag="p" className="mb-[1rem]">
              Total chapters: {comic.chapters.length} chapters{" "}
              <Button element="button" size="xs" type="button" onClick={onOpenChapters}>
                View chapters
              </Button>
            </Typography>
            <Typography tag="p" className="mb-[1rem]">
              Type: {ComicTypeMapping[comic.type]}
            </Typography>
            <Typography tag="p" className="mb-[1rem]">
              Price: {numberToCurrency(comic.price)}
            </Typography>

            <Divider style={{ margin: "1rem 0" }} />

            <Typography tag="p" className="mb-[1rem]">
              Tags: {comic.tags.map((tag) => tag.name).join(", ")}
            </Typography>
            <Typography tag="p" className="mb-[1rem]">
              Categories: {comic.categories.map((category) => category.name).join(", ")}
            </Typography>

            <Divider style={{ margin: "1rem 0" }} />

            <Typography tag="p" className="mb-[1rem]">
              {comic.description}
            </Typography>
          </div>
        </div>
      </div>

      {modalHolder}
    </div>
  );
};

export default ComicDetail;

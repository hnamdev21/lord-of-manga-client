"use client";

import { Card, Statistic, StatisticProps } from "antd";
import React from "react";
import CountUp from "react-countup";

import { VND_CURRENCY } from "@/constants/sign";

const formatter: StatisticProps["formatter"] = (value) => <CountUp end={value as number} separator="." />;

const DashboardModule = () => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-12 gap-[2rem]">
        <Card bordered={false} className="col-span-2">
          <Statistic title="Total users" value={100000} formatter={formatter} />
        </Card>
        <Card bordered={false} className="col-span-2">
          <Statistic title="Total verified users" value={100000} formatter={formatter} />
        </Card>
        <Card bordered={false} className="col-span-2">
          <Statistic title="Total comics" value={100000} formatter={formatter} />
        </Card>
        <Card bordered={false} className="col-span-2">
          <Statistic title="Total pending comics" value={100000} formatter={formatter} />
        </Card>
        <Card bordered={false} className="col-span-2">
          <Statistic title="Total purchase" value={100000} formatter={formatter} suffix={VND_CURRENCY} />
        </Card>
      </div>
    </div>
  );
};

export default DashboardModule;

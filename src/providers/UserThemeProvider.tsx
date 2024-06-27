"use client";

import { ConfigProvider, theme } from "antd";
import React from "react";

const UserThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f44336",
          colorInfo: "#2194f3",
          colorSuccess: "#32d583",
          colorWarning: "#fec84b",
          colorBgLayout: "#161515",
          colorTextBase: "#f5f7fa",
          colorBgBase: "#161515",
          colorBgContainer: "#282d31",
          colorLink: "#f44336",
          lineHeight: 1.6,
          borderRadius: 6,
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default UserThemeProvider;

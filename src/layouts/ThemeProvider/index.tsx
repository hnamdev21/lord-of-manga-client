"use client";

import { ConfigProvider, theme } from "antd";
import React from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f44336",
          colorInfo: "#2194f3",
          colorBgBase: "#161515",
          colorBgContainer: "#282d31",
          borderRadius: 6,
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;

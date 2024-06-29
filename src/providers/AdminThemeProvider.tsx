"use client";

import { ConfigProvider, theme } from "antd";
import React from "react";

const AdminThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorInfo: "#2194f3",
          colorSuccess: "#32d583",
          colorWarning: "#fec84b",
          colorBgLayout: "#f5f7fa",
          colorBgBase: "#ffffff",
          colorBgContainer: "#ffffff",
          colorTextBase: "#1b1b1a",
          colorBorder: "#d1d1d1",
          lineHeight: 1.6,
          borderRadius: 6,
        },
        algorithm: theme.darkAlgorithm,
        hashed: false,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AdminThemeProvider;

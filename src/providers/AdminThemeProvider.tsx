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
          colorBgBase: "#161515",
          colorBgContainer: "#282d31",
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

export default AdminThemeProvider;

"use client";

import { ConfigProvider, theme } from "antd";
import React from "react";

const AdminThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f44336",
          lineHeight: 1.6,
          borderRadius: 6,
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AdminThemeProvider;

"use client";

import { ConfigProvider, theme } from "antd";
import React from "react";

const UserThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
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

export default UserThemeProvider;

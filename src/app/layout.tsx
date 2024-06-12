import "@Styles/app.scss";

import type { Metadata } from "next";

import { roboto } from "@/configs/font";

export const metadata: Metadata = {
  title: "Lord of Manga",
  description: "Lord of Manga. Read manga online for free at Lord of Manga.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}

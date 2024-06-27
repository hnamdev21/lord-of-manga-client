import React from "react";

import Container from "@/components/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen h-screen">
      <Container className="h-screen">
        <div
          className="col-span-6 h-full hidden lg:block"
          style={{
            background: "url(/images/auth-background.png) no-repeat center center / contain",
          }}
        />

        <div className="col-span-6 flex justify-center items-center">
          <div className="flex-1">{children}</div>
        </div>
      </Container>
    </main>
  );
}

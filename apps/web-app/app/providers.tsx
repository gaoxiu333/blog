"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

export function Providers({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="dark"
    >
      <NextUIProvider className={className}>{children}</NextUIProvider>
    </ThemeProvider>
  );
}

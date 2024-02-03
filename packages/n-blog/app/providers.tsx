"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

export function Providers({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string
}) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system">
      <NextUIProvider className={className}>{children}</NextUIProvider>
    </ThemeProvider>
  );
}

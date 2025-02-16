"use client";

import { HeroUIProvider } from "@heroui/react";
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
      <HeroUIProvider className={className}>{children}</HeroUIProvider>
    </ThemeProvider>
  );
}

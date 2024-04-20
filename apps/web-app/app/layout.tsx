import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/prism.css";
import { PageFooter } from "@/components/page-footer";
import { Providers } from "./providers";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "olOwOlo",
  description: "一个前端的自律笔记",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="scroll-container h-full scroll-pt-20"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={`  flex min-h-full flex-col`}>
        <Providers className="flex flex-1 flex-col">
          <main className=" flex flex-1 flex-col">
            <div className="flex-1">
              <PageHeader />
              <main className="py-3">{children}</main>
            </div>
            <PageFooter />
          </main>
        </Providers>
      </body>
    </html>
  );
}

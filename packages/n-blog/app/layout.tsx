import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "前端学习指南",
  description: "程序正在构建中...",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full">
      <body className={`${inter.className} flex flex-col h-full`}>
        <div className="flex-1">
          <PageHeader />
          <main> {children}</main>
        </div>
        <PageFooter className="flex-none" />
      </body>
    </html>
  );
}

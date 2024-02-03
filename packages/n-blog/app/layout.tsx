import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/prism.css";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "前端学习指南",
  description: "程序正在构建中...",
  icons: {
    icon: "/icons/javascript.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" suppressHydrationWarning data-theme="synthwave">
      <body className={`${inter.className} h-full`}>
        <Providers>
          <main className="flex h-full flex-col">
            <div className="flex-1">
              <PageHeader />
              <main> {children}</main>
            </div>
            <PageFooter className="flex-none" />
          </main>
        </Providers>
      </body>
    </html>
  );
}

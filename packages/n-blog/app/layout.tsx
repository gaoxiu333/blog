import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/prism.css";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "olOwOlo",
  description: "程序正在构建中...",
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
      <body className={`  flex min-h-full flex-col`}>
        <Providers className="flex flex-1 flex-col">
          <main className=" flex flex-1 flex-col">
            <div className="flex-1">
              <PageHeader />
              <main className="py-3">{children}</main>
            </div>
            <PageFooter className="flex-none" />
          </main>
        </Providers>
      </body>
    </html>
  );
}

"use client";
import React from "react";
import { Button, Link, Listbox, ListboxItem } from "@nextui-org/react";
import { RefreshBtn } from "@/app/stack/components/refreshBtn";
import { DOC } from "@/prisma/_constant";
import { useRouter } from "next/navigation";

const NAV = [
  {
    name: "前端",
    key: "frontEnd",
  },
  {
    name: "NodeJs",
    key: "nodejs",
  },
  {
    name: "Python",
    key: "python",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <section className="flex">
      <nav className="w-64 flex-none">
        <Listbox
          aria-label="Actions"
          onAction={(key) => router.push(`/stack/${key}`)}
        >
          {NAV.map((item) => {
            return (
              <ListboxItem key={item.key} value={item.key}>
                {item.name}
              </ListboxItem>
            );
          })}
        </Listbox>
      </nav>
      <main className="flex-1">
        <nav className="flex items-center justify-between">
          <RefreshBtn />
          <div className="flex flex-wrap gap-2 pt-2">
            {DOC.map((project: any, idx: number) => {
              return (
                <Link key={idx} href={`/stack/${project.href}`}>
                  <Button size="sm">{project.name}</Button>
                </Link>
              );
            })}
          </div>
        </nav>
        {children}
      </main>
      <div className="flex-none">目录</div>
    </section>
  );
}

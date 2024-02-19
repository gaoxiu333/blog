"use client";
import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
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
  {
    name: "开源项目",
    key: "openSource",
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
      <main className="flex-1">{children}</main>
      <div className="flex-none">目录</div>
    </section>
  );
}

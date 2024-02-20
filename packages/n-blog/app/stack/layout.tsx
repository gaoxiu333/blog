"use client";
import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FRONTEND_TAP_MAP } from "@/prisma/_constant";

const NAV = [
  {
    name: "Front End",
    key: "frontEnd",
    children: FRONTEND_TAP_MAP,
  },
  {
    name: "NodeJs",
    key: "nodejs",
    children: [],
  },
  {
    name: "Python",
    key: "python",
    children: [],
  },
  {
    name: "开源项目",
    key: "openSource",
    children: [],
  },
];
function Nav() {
  return (
    <ul className="p-6 leading-8 ">
      {NAV.map((item, idx) => {
        return (
          <li key={idx} className="cursor-pointer hover:text-default-400">
            <p className="font-bold text-default-500">{item.name}</p>
            <ul className=" list-disc pl-8 text-default-600 ">
              {item.children.map((item) => {
                return (
                  <li
                    className="cursor-pointer hover:text-default-400"
                    key={item.key}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <section className="flex">
      <nav className="w-48 flex-none">
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
    </section>
  );
}

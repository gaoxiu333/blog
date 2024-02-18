import React from "react";
import { PrismaClient } from "@prisma/client";
import { Log } from "@/components/log";
import { Button, Link } from "@nextui-org/react";
import { RefreshBtn } from "@/app/stack/components/refreshBtn";

const prisma = new PrismaClient();
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: any = await prisma.stack.findMany();
  const doc = [
    {
      name: "全部",
      href: "",
    },
    ...data
      .filter((item: any) => ~item.tag.indexOf("前端框架"))
      .map((item: any) => ({ ...item, href: item.name })),
  ];
  return (
    <section className="container">
      <div className="flex justify-end">
        <RefreshBtn />
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        {doc.map((project: any, idx: number) => {
          return (
            <Link key={idx} href={`/stack/${project.href}`}>
              <Button size="sm">{project.name}</Button>
            </Link>
          );
        })}
      </div>
      {children}
    </section>
  );
}

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
  const doc: any = [];
  return (
    <section className="container">
      <RefreshBtn />
      <div className="flex flex-wrap gap-2 pt-2">
        {doc.map((project: any, idx: number) => {
          return (
            <Link key={idx} href={`/stack/${project.name}`}>
              {" "}
              <Button size="sm">{project.name}</Button>
            </Link>
          );
        })}
      </div>
      {children}
    </section>
  );
}

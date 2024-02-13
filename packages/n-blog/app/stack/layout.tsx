import React from "react";
import { PrismaClient } from "@prisma/client";
import { Log } from "@/components/log";
import { Button, Link } from "@nextui-org/react";

const prisma = new PrismaClient();
export default async function Layout({ children, params }: { children: React.ReactNode }) {
  const doc = await prisma.stack.findMany();
  return <section className="container">
    <div className="flex gap-2 pt-2 flex-wrap">
      {doc.map((project: any, idx: number) => {
        return <Link key={idx} href={project.name}> <Button size="sm">{project.name}</Button></Link>;
      })}
    </div>
    {children}
  </section>;
}
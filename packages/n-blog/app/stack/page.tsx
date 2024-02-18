import { Chip, Divider, Link } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import { Log } from "@/components/log";
import _ from "lodash";
import { TAG_MAP } from "@/prisma/_constant";
import { Panel } from "./components/panel";

const prisma = new PrismaClient();

// 获取前端框架

async function getFrontend() {
  const data = await prisma.stack.findMany({
    where: {
      tag: "前端",
    },
  });
  return data;
  // return await data.json();
}

export default async function Page() {
  const list = await getFrontend();
  return (
    <main>
      <Divider />
      <Log info={list} />
      {list.map((item: any, idx: number) => {
        return (
          <Link href={`/stack/${item.name}`} key={idx}>
            <Chip size="sm">{item.name}</Chip>
          </Link>
        );
      })}
      <Panel type="all" />
    </main>
  );
}

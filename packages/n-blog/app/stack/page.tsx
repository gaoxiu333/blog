import { Item } from "./components/item";
import { Chip, Divider, Link } from "@nextui-org/react";
import { RefreshBtn } from "@/app/stack/components/refreshBtn";
import { getHost } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { Log } from "@/components/log";

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
      <div className="q flex gap-2 pt-2.5"></div>
      <Divider />
      <h1>{process.env.BASE_URL}</h1>
      {/*<Stack tag={""} />*/}
      <Log info={list} />
      {list.map((item: any, idx: number) => {
        return (
          <Link href={`/stack/${item.name}`} key={idx}>
            <Chip size="sm">{item.name}</Chip>
          </Link>
        );
      })}
    </main>
  );
}

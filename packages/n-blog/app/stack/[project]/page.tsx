import { PrismaClient } from "@prisma/client";
import { Log } from "@/components/log";
import { Item } from "@/app/stack/components/item";
import { StackCard, StackList } from "../components/stackCard";

const prisma = new PrismaClient();

export default async function Project(props: any) {
  return (
    <section className="flex-1">
      <StackList name="前端" tag={props.params.project} />
      <StackList name="构建平台" tag="platform" />
      <StackList name="UI" tag="ui" />
      <StackList name="数据库" tag="database" />

    </section>
  );
}

import { PrismaClient } from "@prisma/client";
import { Log } from "@/components/log";
import { Item } from "@/app/stack/components/item";

const prisma = new PrismaClient();


export default async function Project(props:any) {
  const list = []
  return <div>
     <section className="flex-1">
      <h2 className="text-xl font-bold py-3">{decodeURIComponent(props.params.project)}</h2>
      {/* <Item data={list} /> */}
    </section>
  </div>;
}
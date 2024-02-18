import { dateToFormat } from "@/lib/time";
import { formatNumber } from "@/lib/utils";
import { Card, CardBody, Link, Tooltip } from "@nextui-org/react";
import {
  CircleDot,
  Download,
  Frown,
  GitCommitHorizontal,
  Laugh,
  Star,
  UsersRound,
} from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { Log } from "@/components/log";

const prisma = new PrismaClient();

export function StackCard({ item }: any) {
  return (
    <Card className="relative">
      <CardBody className="flex flex-col gap-2 ">
        <div className="flex items-center justify-between">
          <Tooltip
            content={
              <div>
                <div className="flex items-center gap-1 text-small text-default-400">
                  <Laugh size={14} />
                  {dateToFormat(item.updateAt)}
                </div>
                {item.errors && (
                  <div className="flex items-center gap-1 text-small text-default-400">
                    <Frown size={14} />
                    {item.errors}
                  </div>
                )}
              </div>
            }
          >
            <Link href={`https://github.com/${item.repo}`} target="_blank">
              {item.name}
            </Link>
          </Tooltip>
          <div className="flex items-center gap-1 text-small text-default-400">
            <span className="origin-right scale-75">
              {dateToFormat(item.createdAt)}
            </span>{" "}
            · <Star size={14} />
            {formatNumber(item.stars)}
          </div>
        </div>
        <div className="truncate text-small text-default-400">
          {item.description}
        </div>
        <div className="flex text-small text-default-400">
          <span>
            {dateToFormat(item.updateAt)} · v{item.version}
          </span>
        </div>
        <div className="flex justify-between text-default-400 ">
          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-sm">
              <GitCommitHorizontal size={14} />
              {formatNumber(item.commits)}
            </div>
            ·
            <div className="flex items-center gap-1 text-sm">
              <UsersRound size={14} />
              {formatNumber(item.contributors)}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Download size={14} />
              {formatNumber(item.downloads)}
            </div>
          </div>
          <Link href={`https://github.com/${item.repo}/issues`} target="_blank">
            <div className="flex items-center gap-1 text-small text-default-400">
              <span className="origin-right scale-75">{item.language}</span>
              <CircleDot size={14} />
              {formatNumber(item.issues)}
            </div>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

async function getStack(tag: string) {
  const stacks = await prisma.stack.findMany();
  const npm = await prisma.npm.findMany();
  const github = await prisma.github.findMany();
  return stacks
    .map((item) => ({
      ...item,
      ...github.find((g) => g.name === item.name),
      ...npm.find((n) => n.name === item.name),
    }))
    .filter((item) => ~item.tag.indexOf(tag));
}
export async function StackList(props: any) {
  const list = await getStack(props.tag);
  return (
    <section className="flex-1">
      <Log info={list.filter((item) => ~item.tag.indexOf(props.tag))} />
      <h2 className="py-3 text-xl font-bold">{props.name}</h2>
      <main className="grid grid-cols-1 gap-2">
        {list.map((item: any, idx: number) => {
          return <StackCard item={item} key={idx} />;
        })}
      </main>
    </section>
  );
}

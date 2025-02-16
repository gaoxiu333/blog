import { dateToFormat } from "@/lib/time";
import { formatNumber } from "@/lib/utils";
import { Card, CardBody, Link, Tooltip } from "@heroui/react";
import {
  CircleDot,
  Download,
  Frown,
  GitCommitHorizontal,
  Laugh,
  Star,
  UsersRound,
} from "lucide-react";

import Image from "next/image";

export function StackCard({ item }: any) {
  return (
    <Card className="relative">
      <CardBody className="flex flex-col gap-2 ">
        <div className="flex items-center justify-between">
          <Image
            width={24}
            height={24}
            src={item.organizationAvatar}
            alt={item.name}
          />
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

export function StackList(props: any) {
  return (
    <section className="flex-1">
      <main className="grid grid-cols-1 gap-2">
        {props.data.map((item: any, idx: number) => {
          return <StackCard item={item} key={idx} />;
        })}
      </main>
    </section>
  );
}

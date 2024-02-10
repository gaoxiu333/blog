import { Card, CardBody } from "@nextui-org/card";
import { CircleDot, Download, Frown, GitCommitHorizontal, Laugh, Star, UsersRound } from "lucide-react";
import { Tooltip, Link } from "@nextui-org/react";
import { Log } from "@/components/log";
import { dateToFormat } from "@/lib/time";
import { formatNumber } from "@/lib/utils";


export function Item(props: any) {
  return <div className="grid grid-cols-2 gap-4">
    {props.data.map((item: any, idx: number) => {
      return <div key={idx} className="flex-initial basis-1/2">
        <Log info={item} />
        <Card className="relative">
          <CardBody className="flex flex-col gap-2 ">
            <div className="flex items-center justify-between">
              <Tooltip content={<div>
                <div className="flex gap-1 items-center text-small text-default-400"><Laugh
                  size={14} />{dateToFormat(item.updatedAt)}</div>
                {item.errors && <div className="flex gap-1 items-center text-small text-default-400"><Frown
                  size={14} />{item.errors}</div>}
              </div>}>
                <Link href={`https://github.com/${item.repo}`} target="_blank">{item.name}</Link>
              </Tooltip>
              <div className="flex gap-1 items-center text-small text-default-400"><span
                className="scale-75 origin-right">{item.createdAtText}</span> · <Star size={14} />{formatNumber(item.stars)}</div>
            </div>
            <div className="h-12">
              <div className="text-small text-default-400 line-clamp-2">
                {item.description}
              </div>
            </div>
            <div className="text-small text-default-400 flex">
              <span>{dateToFormat(item.updateDate)} · {item.version}</span>
            </div>
            <div className="flex justify-between text-default-400 ">
              <div className="flex gap-2">
                <div className="flex gap-1 items-center text-sm"><GitCommitHorizontal size={14} />{formatNumber(item.commitsCount)}
                </div>
                ·
                <div className="flex gap-1 items-center text-sm"><UsersRound size={14} />{formatNumber(item.contributorsCount)}</div>
                <div className="flex gap-1 items-center text-sm"><Download size={14} />{formatNumber(item.downloads)}</div>
              </div>
              <Link href={`https://github.com/${item.repo}/issues`} target="_blank">
                <div className="flex gap-1 items-center text-small text-default-400">
                  <span className="scale-75 origin-right">{item.language}</span>
                  <CircleDot size={14} />{formatNumber(item.openIssuesCount)}
                </div>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>;
    })}
  </div>;
}

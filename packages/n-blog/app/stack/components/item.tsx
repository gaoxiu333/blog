import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { CircleDot, Download, GitCommitHorizontal, Star, UsersRound } from "lucide-react";
import { Link } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";


export function Item(props: any) {
  // const router = useRouter()
  return <div className="grid grid-cols-2 gap-4">
    {props.data.map((item: any, idx: number) => {
      return <div key={idx} className="flex-initial basis-1/2">
        <Card className="relative">
          {/*<div className='absolute top-1 left-1 font-bold text-6xl text-default-100'>{item.language}</div>*/}
          <CardBody className="flex flex-col gap-2 ">
            <div className="flex items-center justify-between">
              {/*<Image width={30} height={30} src={'/logos/react.svg'} alt={'logo'} />*/}
              <Link href={`https://github.com/${item.repo}`} target="_blank">{item.name}</Link>
              {/*<div className='text-default-400 text-small'>{item.createdAtText}</div>*/}
              <div className="flex gap-1 items-center text-small text-default-400"><span
                className="scale-75 origin-right">{item.createdAtText}</span> · <Star size={14} />{item.stars}</div>
            </div>
            <div className="h-12">
              <div className="text-small text-default-400 line-clamp-2">
                {item.description}
              </div>
            </div>
            <div className="text-small text-default-400 flex">
              {/*<Chip size="sm">{item.updateDateText} · {item.version}</Chip>*/}
              <span>{item.updateDateText} · {item.version}</span>
              {/*<span></span>*/}
            </div>
            <div className="flex justify-between text-default-400 ">
              <div className="flex gap-2">
                <div className="flex gap-1 items-center text-sm"><GitCommitHorizontal size={14} />{item.commitsCount}
                </div>
                ·
                <div className="flex gap-1 items-center text-sm"><UsersRound size={14} />{item.contributorsCount}</div>
                <div className="flex gap-1 items-center text-sm"><Download size={14} />{item.downloads}</div>
              </div>
              <Link href={`https://github.com/${item.repo}/issues`} target="_blank">
                <div className="flex gap-1 items-center text-small text-default-400">
                  <span className="scale-75 origin-right">{item.language}</span>
                  <CircleDot size={14} />{item.openIssuesCount}
                </div>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>;
    })}
  </div>;
}

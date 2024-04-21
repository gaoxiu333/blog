"use client";
import { IfyIcon } from "@/client/components/IfyIcon";
import {
  Card,
  CardBody,
  Link,
  Image,
  Skeleton,
  Button,
} from "@nextui-org/react";
import { shuffle, take } from "lodash";
import { useEffect, useState } from "react";
import { STACKS } from "./constans";

const HomeBanner: React.FC = () => {
  const [stacks, setStacks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(`/stacks.json`)
      .then((res) => res.json())
      .then((res: any) => {
        const current: any = take(shuffle(res), 8);
        setStacks(current);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <Card className="w-full" radius="none" isBlurred shadow="none">
      <CardBody className="p-12">
        <main className="container flex flex-row flex-nowrap">
          <div className="flex basis-1/2 flex-col items-center justify-around py-12">
            <p className="text-default-500">Hi~ 我是一名小前端</p>
            <p className="text-default-500">会一些</p>
            <span className="home-panle font-black">
              React、Vue、Angular、Nodejs...
            </span>
            <p className="flex gap-2 h-3">
              {STACKS.map((stack: any) => {
                return (
                  <IfyIcon
                    key={stack.name}
                    icon={stack.icon}
                    width={12}
                    height={12}
                  />
                );
              })}
            </p>
          </div>
          <div className="flex  basis-1/2 flex-col justify-end gap-12">
            <ul className="flex flex-wrap justify-center gap-8  h-[160px]">
              {stacks.map((stack: any) => {
                return (
                  <li
                    key={stack.name}
                    style={{
                      animation: `bounce ${Math.round(
                        Math.random() * 30
                      )}s infinite`,
                    }}
                    className="flex  items-center gap-2"
                  >
                    <Image
                      src={stack.organizationAvatar}
                      alt={stack.name}
                      isBlurred
                      isZoomed
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-small text-default-400">
                      {stack.name}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="text-center">
              <Button variant="ghost" className="border-none">
                <Link className="text-small text-default-700" href="/stack">
                  查看我关注的堆栈
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </CardBody>
    </Card>
  );
};

export { HomeBanner };

"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import _, { map } from "lodash";
import { Panel } from "./components/panel";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { FRONTEND_TAP_MAP } from "@/prisma/_constant";

const stacks = [
  {
    name: "react",
    icon: "logos:react",
  },
  {
    name: "vue",
    icon: "logos:vue",
  },
  {
    name: "angular",
    icon: "logos:angular-icon",
  },
  {
    name: "nodejs",
    icon: "logos:nodejs",
  },
  {
    name: "python",
    icon: "logos:python",
  },
];

export default function Page() {
  return (
    <main className="m-auto max-w-[1200px]">
      <header className="py-6">
        <h2 className=" my-3 text-center text-2xl font-black">我的堆栈</h2>
        {/* <p className="text-center text-sm text-default-400">
          我使用过或者我也想学习的堆栈
        </p> */}
        <div className="flex justify-end gap-2">
          {stacks.map((item) => {
            return (
              <Icon key={item.name} icon={item.icon} width={20} height={20} />
            );
          })}
        </div>
      </header>
      <main className="grid grid-cols-1 gap-6">
        {stacks.map((item) => {
          return (
            <div key={item.name}>
              <h3 className="text-3xl font-black capitalize text-default-200">
                {item.name}
              </h3>
              <StackCard data={item} />
            </div>
          );
        })}
      </main>
    </main>
  );
}
type StackCardProps = {
  name: string;
  icon: string;
};
function StackCard({ data }: { data: StackCardProps }) {
  const [stacks, setStacks] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  useEffect(() => {
    fetch(`/api/stack?tag=${data.name}`)
      .then((res) => res.json())
      .then((res: any) => {
        console.log("res", res);
        const tags = [
          ...new Set(res.map((item: any) => item.tag.split(",")[0])),
        ].map((item) => {
          const name = FRONTEND_TAP_MAP.find((i) => i.key === item)?.name;
          return name || item;
        });
        setTags(tags);
        setStacks(res);
      });
  }, [data.name]);
  return (
    <Card>
      <CardHeader>
        <Tabs aria-label="Options" variant="underlined" size='sm'>
          {tags.map((item) => {
            return <Tab key={item} title={item}></Tab>;
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        <div className="flex flex-wrap gap-3">
          {stacks.map((item: any) => {
            return (
              <Image
                className=" rounded-full"
                key={item.name}
                width={24}
                height={24}
                src={item.organizationAvatar}
                alt={item.name}
              />
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}

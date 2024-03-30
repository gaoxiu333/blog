"use client";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { FRONTEND_TAP_MAP } from "@/prisma/_constant";
import StackModalDetail from "./components/StackModalDetail";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [viewStack, setViewStack] = useState<any>("");
  const handleClick = (event: string) => {
    setViewStack(event);
    onOpen();
  };

  return (
    <main className="m-auto max-w-[1200px]">
      <header className="py-6">
        <h2 className=" my-3 text-center text-2xl font-black">我的堆栈</h2>
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
              <StackCard onClick={() => handleClick(item.name)} data={item} />
            </div>
          );
        })}
        <StackModalDetail
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          stack={viewStack}
        />
      </main>
    </main>
  );
}
type StackCardProps = {
  name: string;
  icon: string;
};
function StackCard({
  data,
  onClick,
}: {
  data: StackCardProps;
  onClick: () => void;
}) {
  const [stacks, setStacks] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("all");
  useEffect(() => {
    fetch(`/api/stack?tag=${data.name}`)
      .then((res) => res.json())
      .then((res: any) => {
        const tags = [
          ...new Set(res.map((item: any) => item.tag.split(",")[0])),
        ].map((item) => {
          const current = FRONTEND_TAP_MAP.find((i) => i.key === item);
          return current || { name: item, key: item };
        });
        setTags([{ name: "全部", key: "all" }, ...tags]);
        setStacks(res);
      });
  }, [data.name]);

  return (
    <Card isHoverable isPressable radius="lg" shadow="sm" onPress={onClick}>
      <CardBody>
        <div className="flex flex-wrap gap-5">
          {stacks
            .filter((item) =>
              selected === "all" ? true : item.tag.indexOf(selected) > -1,
            )
            .map((item: any) => {
              return (
                <div key={item.name} className="flex items-center gap-1">
                  <Image
                    className=" rounded-full"
                    width={24}
                    height={24}
                    src={item.organizationAvatar}
                    alt={item.name}
                  />
                  <small className="text-default-400">{item.name}</small>
                </div>
              );
            })}
        </div>
      </CardBody>
    </Card>
  );
}
